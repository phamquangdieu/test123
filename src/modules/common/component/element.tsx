import { Backdrop, fade, InputBase } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { LIGHT_GREY } from "../../../colors";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const CustomInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(),
    },
  },
  input: {
    borderRadius: 3,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  disabled: {
    borderColor: `${LIGHT_GREY}`,
  },
}))(InputBase);

export const CustomLink = styled(Link)`
  text-decoration: none;
`;

export const CustomBackdrop = withStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))(Backdrop);
