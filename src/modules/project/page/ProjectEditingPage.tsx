import { Paper } from "@material-ui/core";
import { LIGHT_GREY } from "../../../colors";
import AppBar from "../../common/component/AppBar";
import MainLayout from "../../common/component/MainLayout";
import NavigationMenu from "../../common/component/NavigationMenu";
import { PROJECT } from "../../common/constants";
import EditProject from "../component/EditProject";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useRouteMatch } from "react-router";
import { useMemo } from "react";

const ProjectEditingPage: React.FC<{}> = () => {
  const intl = useIntl();

  const match = useRouteMatch<{ id: string }>();

  const projectId = useMemo(() => {
    return match.params.id;
  }, [match]);

  return (
    <MainLayout
      menu={<NavigationMenu />}
      appBar={<AppBar titleMsgId={PROJECT.items[0].msgId} />}
    >
      <Helmet>
        <title>{intl.formatMessage({ id: "project.projectEditing" })}</title>
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
          <EditProject id={projectId} />
        </Paper>
      </div>
    </MainLayout>
  );
};

export default ProjectEditingPage;
