import { Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouteMatch } from "react-router";
import { BLACK_TEXT, SECONDARY } from "../../../../colors";
import { ALL_MENU } from "../../constants";
import { CustomLink } from "../element";
import {
  IconContainer,
  MenuItemButton,
  NavigationMenuAccordion,
  NavigationMenuAccordionDetails,
  NavigationMenuAccordionSummary,
} from "../NavigationMenu/styles";

interface Props {}

const NavigationMenu: React.FC<Props> = (props) => {
  const match = useRouteMatch();

  const [show, setShow] = useState(true);

  return (
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      <div
        style={{
          overflow: "hidden",
          transition: "width 200ms",
          width: show ? 180 : 0,
          backgroundColor: `${SECONDARY}`,
          color: "white",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <div
          style={{
            width: 180,
          }}
        >
          <div>
            <div
              style={{
                textAlign: "center",
                padding: 18,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h5" color="inherit">
                <FormattedMessage id="D-BO" />
              </Typography>
            </div>
          </div>
          {ALL_MENU.map((group) => (
            <NavigationMenuAccordion key={group.path} square>
              <NavigationMenuAccordionSummary
                expandIcon={<ExpandMoreIcon htmlColor="white" />}
              >
                <IconContainer>{<group.Icon />}</IconContainer>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  style={{ textTransform: "uppercase" }}
                >
                  <FormattedMessage id={group.msgId}></FormattedMessage>
                </Typography>
              </NavigationMenuAccordionSummary>
              <NavigationMenuAccordionDetails>
                {group.items.map((item) => (
                  <div
                    key={item.path}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <CustomLink to={item.path} style={{ width: "100%" }}>
                      <MenuItemButton
                        fullWidth
                        variant="text"
                        key={item.path}
                        disabled={item.path === match.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 56,
                          justifyContent: "inherit",
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          <FormattedMessage id={item.msgId}></FormattedMessage>
                        </Typography>
                      </MenuItemButton>
                    </CustomLink>
                  </div>
                ))}
              </NavigationMenuAccordionDetails>
            </NavigationMenuAccordion>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "100%",
          display: "flex",
          alignItems: "center",
          color: BLACK_TEXT,
          height: 60,
        }}
      >
        <Button variant="text" onClick={() => setShow((old) => !old)}>
          <MenuIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationMenu;
