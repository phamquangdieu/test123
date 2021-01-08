import { red } from "@material-ui/core/colors";
import { createMuiTheme, darken, fade } from "@material-ui/core/styles";
import { PRIMARY, SECONDARY, BLACK_TEXT, LIGHT_GREY } from "./colors";

export const MUITheme = createMuiTheme({
  palette: {
    primary: {
      light: fade(PRIMARY, 0.9),
      main: PRIMARY,
      dark: darken(PRIMARY, 0.1),
      contrastText: "#ffffff",
    },
    secondary: {
      light: fade(SECONDARY, 0.9),
      main: SECONDARY,
      dark: darken(SECONDARY, 0.1),
      contrastText: "#ffffff",
    },
    error: {
      light: red[300],
      main: red[600],
      dark: red[700],
      contrastText: "#ffffff",
    },
    text: {
      primary: BLACK_TEXT,
      secondary: LIGHT_GREY,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: "Arial",

    button: { textTransform: "none" },
    h1: {
      fontWeight: "bold",
      fontSize: "48px",
      lineHeight: "72px",
      letterSpacing: "2px",
      color: BLACK_TEXT,
    },
    h2: {
      fontWeight: "bold",
      fontSize: "36px",
      lineHeight: "40px",
      letterSpacing: "1px",
      color: BLACK_TEXT,
    },
    h3: {
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "32px",
      letterSpacing: "1px",
      color: BLACK_TEXT,
    },
    h4: {
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "1px",
      color: BLACK_TEXT,
    },
    h5: {
      fontSize: "20px",
      lineHeight: "24px",
      letterSpacing: "1px",
      color: BLACK_TEXT,
    },
    h6: {
      fontSize: "18px",
      lineHeight: "21px",
      letterSpacing: "1px",
      color: BLACK_TEXT,
    },
    subtitle1: {
      fontWeight: "bold",
      fontSize: "17px",
      lineHeight: "20px",
      color: BLACK_TEXT,
    },
    subtitle2: {
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "18px",
      color: BLACK_TEXT,
    },
    caption: {
      fontSize: "14px",
      lineHeight: "18px",
      color: BLACK_TEXT,
    },
    body1: {
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "24px",
      color: BLACK_TEXT,
    },
    body2: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
      color: BLACK_TEXT,
    },
  },
});
