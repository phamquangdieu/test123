import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  darken,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { SECONDARY } from "../../../../colors";

const white = "#f5f7fa";

export const NavigationMenuAccordion = withStyles({
  root: {
    color: white,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(Accordion);

export const NavigationMenuAccordionSummary = withStyles({
  root: {
    backgroundColor: `${SECONDARY}`,
    color: white,
    marginBottom: -1,
    minHeight: 56,
    padding: "0 5px",
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    margin: "6px 0",
    "&$expanded": {
      margin: "6px 0",
    },
  },
  expanded: {},
})(AccordionSummary);

export const NavigationMenuAccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: `${SECONDARY}`,
    color: white,
    padding: 0,
    flexDirection: "column",
  },
}))(AccordionDetails);

const currentItemColor = "#4965b8";

export const MenuItemButton = withStyles((theme) => ({
  root: {
    color: white,
    padding: 14,
    display: "block",
    flex: 1,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: darken(SECONDARY, 0.1),
    },
  },
  disabled: {
    backgroundColor: currentItemColor,
    color: "white !important",
  },
}))(Button);

export const IconContainer = styled.div`
  width: 25px;
  padding: 14px;
`;
