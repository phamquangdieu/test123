import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AppState } from "../../../redux/reducer";
import { API } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import { ProjectUtilityDesc, PropertyTypeDesc } from "../model";

export interface ProjectState {
  projectMetadata: {
    propertyTypes: PropertyTypeDesc[];
    utilityTypes: ProjectUtilityDesc[];
  };
}

export const storePropertyTypes = createCustomAction(
  "project/metadata/storePropertyTypes",
  (propertyTypes: PropertyTypeDesc[]) => ({ propertyTypes })
);

export const storeUtilityTypes = createCustomAction(
  "project/metadata/storeUtilityTypes",
  (utilityTypes: ProjectUtilityDesc[]) => ({ utilityTypes })
);

export function loadProjectMetadata(): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> {
  return (dispatch, getState) => {
    dispatch(
      fetchThunk(API.projectPropertyTypes, {
        cancelled: false,
        data: [{ code: "", text: "" }],
      })
    ).then(({ content: res }) =>
      dispatch(storePropertyTypes(res as PropertyTypeDesc[]))
    );
    dispatch(
      fetchThunk(API.projectUtilityTypes, {
        cancelled: false,
        data: [{ id: 0, name: "" }],
      })
    ).then(({ content: res }) =>
      dispatch(storeUtilityTypes(res as ProjectUtilityDesc[]))
    );
  };
}

const actions = {
  storePropertyTypes,
  storeUtilityTypes,
};

type ActionT = ActionType<typeof actions>;

export default function projectReducer(
  state: ProjectState = {
    projectMetadata: { utilityTypes: [], propertyTypes: [] },
  },
  action: ActionT
): ProjectState {
  switch (action.type) {
    case getType(storePropertyTypes):
      return {
        ...state,
        projectMetadata: {
          ...state.projectMetadata,
          propertyTypes: action.propertyTypes,
        },
      };
    case getType(storeUtilityTypes):
      return {
        ...state,
        projectMetadata: {
          ...state.projectMetadata,
          utilityTypes: action.utilityTypes,
        },
      };
    default:
      return state;
  }
}
