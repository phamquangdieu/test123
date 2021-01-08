import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { logout } from "../../authen/redux/authenReducer";
import { LS_TOKEN, some } from "../constants";
import { setNetworkError } from "./commonReducer";

export function fetchThunk(
  url: string,
  fallback = { cancelled: false, data: {} },
  method: "delete" | "put" | "get" | "post" = "get",
  body?: string | FormData,
  contentType?: string
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    while (true) {
      let res;
      const token = localStorage.getItem(LS_TOKEN) || "";
      try {
        res = await fetch(url, {
          method,
          body,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": contentType || "application/json",
          },
        });
      } catch (_) {}

      if (res) {
        if (res.ok) {
          if (method === "delete") {
            return {};
          }
          if (fallback.cancelled) {
            return fallback.data;
          }

          try {
            const json = await res.text();
            if (json) {
              return JSON.parse(json);
            }
            return { auth: res.headers.get("authorization") };
          } catch (e) {
            return {};
          }
        }

        if (res.status === 400 || res.status === 402) {
          return {};
        }
        if (res.status === 401) {
          dispatch(logout());
          return {};
        }
        if (res.status === 403) {
          // dispatch(setNetworkError("Forbidden"));
          return {};
        }
      }

      let hasInternet = true;
      try {
        await fetch("https://google.com", { mode: "no-cors" });
      } catch (_) {
        hasInternet = false;
      }

      dispatch(
        setNetworkError(hasInternet ? "serverProblem" : "unstableNetwork")
      );

      do {
        await new Promise((resolve) => setTimeout(resolve, 250));
      } while (!!getState().common.networkErrorMsg);
      continue;
    }
  };
}
