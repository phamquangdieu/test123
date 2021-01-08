import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { AppState } from "../../../redux/reducer";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { logout } from "../../authen/redux/authenReducer";

interface Props extends ReturnType<typeof mapStateToProps> {
  titleMsgId: string;
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const AppBar: React.FC<Props> = (props) => {
  return (
    <Paper
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        paddingLeft: 70,
        paddingRight: 20,
      }}
      square
      elevation={2}
    >
      <div style={{ flex: 1 }}>
        <Typography variant="subtitle1">
          <FormattedMessage id={props.titleMsgId} />
        </Typography>
      </div>
      <div style={{ margin: "0 20px" }}>
        <Typography variant="body1">{props.user}</Typography>
      </div>
      <div>
        <Button variant="outlined" onClick={() => props.dispatch(logout())}>
          <Typography variant="body1">
            <FormattedMessage id="authen.logout" />
          </Typography>
        </Button>
      </div>
    </Paper>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.authen.user,
  };
}

export default connect(mapStateToProps)(AppBar);
