import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const AuthenticatingPage: React.FC<{}> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">
        <FormattedMessage id="authen.authenticating" />
      </Typography>
    </div>
  );
};

export default AuthenticatingPage;
