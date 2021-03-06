import { Paper } from "@material-ui/core";
import { LIGHT_GREY } from "../../../colors";
import AppBar from "../../common/component/AppBar";
import MainLayout from "../../common/component/MainLayout";
import NavigationMenu from "../../common/component/NavigationMenu";
import CreateProjectWizard from "../component/CreateProjectWizard";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

const ProjectCreatingPage: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <MainLayout
      menu={<NavigationMenu />}
      appBar={<AppBar titleMsgId="project.projectCreating" />}
    >
      <Helmet>
        <title>{intl.formatMessage({ id: "project.projectCreating" })}</title>
      </Helmet>
      <div
        style={{
          padding: 20,
          backgroundColor: LIGHT_GREY,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper elevation={0} square style={{ flex: 1 }}>
          <CreateProjectWizard />
        </Paper>
      </div>
    </MainLayout>
  );
};

export default ProjectCreatingPage;
