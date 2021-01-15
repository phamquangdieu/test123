import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AppState } from "../../../redux/reducer";
import { API } from "../constants";
import { Province } from "../model";
import { fetchThunk } from "./thunk";

export interface CommonState {
  readonly networkErrorMsg?: string;
  readonly commonErrorMsg?: string;
  metadata: {
    allProvinces: Province[];
  };
}

export const setNetworkError = createCustomAction(
  "common/setNetworkError",
  (errorMsg?: string) => ({ errorMsg })
);

export const setCommonError = createCustomAction(
  "common/setCommonError",
  (errorMsg?: string) => ({ errorMsg })
);

export const storeProvinces = createCustomAction(
  "common/storeProvinces",
  (provinces: Province[]) => ({ provinces })
);

export function loadAllProvinces(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  Action<string>
> {
  return async (dispatch, getState) => {
    const fakeProvince: Province = { code: "0", name: "" };
    const { content: res } = await dispatch(
      fetchThunk(API.getAllProvinces, {
        cancelled: false,
        data: [fakeProvince],
      })
    );
    dispatch(storeProvinces(res as Province[]));
  };
}

const actions = {
  setNetworkError,
  setCommonError,
  storeProvinces,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = { metadata: { allProvinces: [] } },
  action: ActionT
): CommonState {
  switch (action.type) {
    case getType(setNetworkError):
      return { ...state, networkErrorMsg: action.errorMsg };
    case getType(setCommonError):
      return { ...state, commonErrorMsg: action.errorMsg };
    case getType(storeProvinces):
      return {
        ...state,
        metadata: { ...state.metadata, allProvinces: action.provinces },
      };
    default:
      return state;
  }
}
