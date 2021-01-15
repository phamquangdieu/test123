import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import intlReducer, { IntlState } from "../modules/intl/redux/intlReducer";
import commonReducer, {
  CommonState,
} from "../modules/common/redux/commonReducer";
import authenReducer, {
  AuthenState,
} from "../modules/authen/redux/authenReducer";
import projectReducer, {
  ProjectState,
} from "../modules/project/redux/projectReducer";

export interface AppState {
  router: RouterState;
  intl: IntlState;
  common: CommonState;
  authen: AuthenState;
  project: ProjectState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    common: commonReducer,
    authen: authenReducer,
    project: projectReducer
  });
}
