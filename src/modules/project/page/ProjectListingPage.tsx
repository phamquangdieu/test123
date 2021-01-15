import { Paper } from "@material-ui/core";
import React from "react";
import { LIGHT_GREY } from "../../../colors";
import AppBar from "../../common/component/AppBar";
import MainLayout from "../../common/component/MainLayout";
import NavigationMenu from "../../common/component/NavigationMenu";
import { PROJECT } from "../../common/constants";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

const ProjectListingPage: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <MainLayout
      menu={<NavigationMenu />}
      appBar={<AppBar titleMsgId={PROJECT.items[0].msgId} />}
    >
      
      <Helmet>
        <title>{intl.formatMessage({ id: "project.projectListing" })}</title>
      </Helmet>
      <div style={{ padding: 20, backgroundColor: LIGHT_GREY }}>
        <Paper elevation={0} square>
          ABC
        </Paper>
      </div>
    </MainLayout>
  );
};

export default ProjectListingPage;
