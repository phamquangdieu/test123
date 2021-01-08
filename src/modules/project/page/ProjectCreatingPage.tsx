import { Paper } from "@material-ui/core";
import { LIGHT_GREY } from "../../../colors";
import AppBar from "../../common/component/AppBar";
import MainLayout from "../../common/component/MainLayout";
import NavigationMenu from "../../common/component/NavigationMenu";
import { PROJECT } from "../../common/constants";
import CreateProjectWizard from "../component/CreateProjectWizard";

const ProjectCreatingPage: React.FC<{}> = () => {
  return (
    <MainLayout
      menu={<NavigationMenu />}
      appBar={<AppBar titleMsgId={PROJECT.items[0].msgId} />}
    >
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
