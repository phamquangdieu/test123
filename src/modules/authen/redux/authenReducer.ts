import { replace } from "connected-react-router";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AppState } from "../../../redux/reducer";
import { API, LS_TOKEN } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import jwt from "jsonwebtoken";

export interface AuthenState {
  authen: boolean;
  user: string | null;
}

export const authenIn = createCustomAction("authen/in", (user: string) => ({
  user,
}));
export const authenOut = createCustomAction("authen/out");

export const saveToken = createCustomAction(
  "auth/saveToken",
  (token: string) => ({ token })
);


export function logout(
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch) => {
    localStorage.removeItem(LS_TOKEN);
    dispatch(authenOut());
  }
}

export function processVNDirectToken(
  vnDirectToken: string
): ThunkAction<Promise<void>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    try {
      const res = await dispatch(
        fetchThunk(API.authenVnDirectToken(vnDirectToken))
      );
      const jwtTokenStr = res.auth.substring(7); // substring to remove prefix "Bearer "
      const jwtToken = jwt.decode(jwtTokenStr);
      if (jwtTokenStr && jwtToken) {
        localStorage.setItem(LS_TOKEN, jwtTokenStr);

        dispatch(authenIn(jwtToken.sub));
      }
      const pathname = window.location.pathname;
      const search = window.location.search.substring(
        0,
        window.location.search.indexOf("?token-id=")
      );
      dispatch(replace({ pathname, search }));
    } catch (e) {}
  };
}

const actions = {
  authenIn,
  authenOut,
};

type ActionT = ActionType<typeof actions>;

export default function authenReducer(
  state = { authen: false, user: null },
  action: ActionT
): AuthenState {
  switch (action.type) {
    case getType(authenIn):
      return { ...state, authen: true, user: action.user };
    case getType(authenOut):
      return { ...state, authen: false, user: null };
    default:
      return state;
  }
}
