import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { logout } from "../../authen/redux/authenReducer";
import { LS_TOKEN, some } from "../constants";
import { setCommonError, setNetworkError } from "./commonReducer";

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
          headers:
            contentType !== "multipart/form-data"
              ? {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": contentType || "application/json",
                }
              : {
                  Authorization: `Bearer ${token}`,
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
              return { status: res.status, content: JSON.parse(json) };
            }
            res.headers.forEach((value, key) => console.log(value, key));
            // hack here because authorization endpoint returns access in header instead of response body
            return { auth: res.headers.get("authorization") };
          } catch (e) {
            return { status: res.status, content: fallback.data };
          }
        }

        if (res.status === 400 || res.status === 402) {
          return { status: res.status, content: fallback.data };
        }
        if (res.status === 401) {
          dispatch(logout());
          return { status: 401, content: fallback.data };
        }
        if (res.status === 403) {
          dispatch(setCommonError("forbidden"));
          return { status: 403, content: fallback.data };
        }
        if (res.status === 500) {
          return { error: 500 };
        }

        return { status: res.status, content: fallback.data };
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
