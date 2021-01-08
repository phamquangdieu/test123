import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import AuthenticatingPage from "../../authen/page/AuthenticatingPage";
import { processVNDirectToken } from "../../authen/redux/authenReducer";
import { ROUTES } from "../constants";

interface Props extends RouteProps {
  auth: boolean;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { auth, ...restProps } = props;
  const tokenIdIndex = window.location.href.indexOf("?token-id=");
  const token =
    tokenIdIndex !== -1
      ? window.location.href.substring(tokenIdIndex + 10)
      : "";

  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(processVNDirectToken(token));
    }
  }, [token, dispatch]);

  if (token && !auth) {
    return <Route {...restProps} component={AuthenticatingPage} />;
  } else if (auth) {
    return <Route {...restProps} />;
  }
  return (
    <Redirect
      to={{
        pathname: `${ROUTES.login}`,
        search: `?from=${encodeURIComponent(
          `${window.location.pathname}${window.location.search}` || "/"
        )}`,
      }}
    />
  );
};

export default React.memo(ProtectedRoute);
