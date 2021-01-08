import React from "react";
import { RouteProps, Route, Redirect } from "react-router";

interface Props extends RouteProps {
  auth: boolean;
}

const RedirectRoute: React.FC<Props> = (props) => {
  const { auth, ...restProps } = props;
  if (auth) {
    let from = "/";
    if (props.location) {
      const params = new URLSearchParams(props.location.search);
      const fromParamValue = params.get("from");
      if (fromParamValue) {
        from = fromParamValue;
      }
    }
    return <Redirect to={from} />;
  }
  return <Route {...restProps} />;
};

export default RedirectRoute;
