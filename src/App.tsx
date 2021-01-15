import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Login from "./modules/authen/page/LoginPage";
import NetworkErrorDialog from "./modules/common/component/NetworkErrorDialog";
import CommonErrorDialog from "./modules/common/component/CommonErrorDialog";
import ProtectedRoute from "./modules/common/component/ProtectedRoute";
import RedirectRoute from "./modules/common/component/RedirectRoute";
import ScrollToTop from "./modules/common/component/ScrollToTop";
import TestPage from "./modules/common/page/TestPage";
import ProjectCreatingPage from "./modules/project/page/ProjectCreatingPage";
import ProjectEditingPage from "./modules/project/page/ProjectEditingPage";
import ProjectListingPage from "./modules/project/page/ProjectListingPage";
import { AppState } from "./redux/reducer";
import { MUITheme } from "./setupTheme";
import { SnackbarProvider } from "notistack";

interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = ({ authen, networkErrorMsg, commonErrorMsg }) => {
  return (
    <ThemeProvider theme={MUITheme}>
      <SnackbarProvider maxSnack={3}>
        <NetworkErrorDialog msgId={networkErrorMsg} />
        <CommonErrorDialog msgId={commonErrorMsg} />
        <ScrollToTop>
          <Switch>
            <Redirect exact path="/" to="/project/listing" />
            <ProtectedRoute
              auth={authen}
              exact
              path="/project/listing"
              component={ProjectListingPage}
            />
            <ProtectedRoute
              auth={authen}
              exact
              path="/project/creating"
              component={ProjectCreatingPage}
            />
            <ProtectedRoute
              auth={authen}
              exact
              path="/project/editing/:id"
              component={ProjectEditingPage}
            />
            <Route exact path="/test" component={TestPage} />
            <RedirectRoute auth={authen} path="/login" component={Login} />
          </Switch>
        </ScrollToTop>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

function mapStateToProps(state: AppState) {
  return {
    authen: state.authen.authen,
    networkErrorMsg: state.common.networkErrorMsg,
    commonErrorMsg: state.common.commonErrorMsg,
  };
}

export default connect(mapStateToProps)(App);
