import { PropertyTypeDesc, ProjectUtilityDesc } from "../model";
import { ActionType, createCustomAction, getType } from "typesafe-actions";

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

const actions = {
  storePropertyTypes,
  storeUtilityTypes,
};

type Action = ActionType<typeof actions>;

export default function projectReducer(
  state: ProjectState = {
    projectMetadata: { utilityTypes: [], propertyTypes: [] },
  },
  action: Action
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
