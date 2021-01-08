import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Switch } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Login from "./modules/authen/page/LoginPage";
import ProtectedRoute from "./modules/common/component/ProtectedRoute";
import RedirectRoute from "./modules/common/component/RedirectRoute";
import ScrollToTop from "./modules/common/component/ScrollToTop";
import { fetchThunk } from "./modules/common/redux/thunk";
import ProjectListingPage from "./modules/project/page/ProjectListingPage";
import ProjectCreatingPage from "./modules/project/page/ProjectCreatingPage";
import { AppState } from "./redux/reducer";
import { MUITheme } from "./setupTheme";

interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = ({ authen }) => {
  const dispatch: ThunkDispatch<AppState, null, Action<string>> = useDispatch();
  useEffect(() => {
    dispatch(fetchThunk("www.google.com"));
  }, [dispatch]);

  return (
    <ThemeProvider theme={MUITheme}>
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
          <RedirectRoute auth={authen} path="/login" component={Login} />
        </Switch>
      </ScrollToTop>
    </ThemeProvider>
  );
};

function mapStateToProps(state: AppState) {
  return { authen: state.authen.authen };
}

export default connect(mapStateToProps)(App);
