import HomeIcon from "@material-ui/icons/Home";

export type some = { [key: string]: any };

export const LS_TOKEN = "token";

export const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const VNDirectIdLink = `${
  process.env.REACT_APP_VNDIRECT_ID_SERVICE || "https://id-uat.vndirect.com.vn"
}`;

export const APIHost = development
  ? "http://localhost:3000/api"
  : `${process.env.REACT_APP_API_SERVICE || "http://10.26.53.24:8080"}`;

export const ROUTES = {
  login: "/login",
  project: "/project",
  projectListing: "/project/listing",
};

export const API = {
  authenVnDirectToken: (vnDirectToken: string) =>
    `${APIHost}/auth-service/api/v1/auth-by-vndid/jwt?tokenId=${vnDirectToken}`,
  searchDevelopers: (search: string) =>
    `${APIHost}/property-service/api/v1/investors?keyword=${search}&page=0&size=10`,
};

export const PROJECT = {
  path: ROUTES.project,
  msgId: "project",
  Icon: HomeIcon,
  items: [
    { path: ROUTES.projectListing, msgId: "project.projectListing" },
    { path: "project/test", msgId: "project.projectCreating" },
  ],
};

export const ALL_MENU = [PROJECT];
