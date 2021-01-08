import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface CommonState {
  readonly networkErrorMsg?: string;
}

export const setNetworkError = createCustomAction(
  'common/setNetworkError',
  (errorMsg?: string) => ({ errorMsg }),
);


const actions = {
  setNetworkError
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = { },
  action: Action,
): CommonState {
  switch (action.type) {
    case getType(setNetworkError):
      return { ...state, networkErrorMsg: action.errorMsg };
    default:
      return state;
  }
}