import HomeIcon from "@material-ui/icons/Home";

export type some = { [key: string]: any };

export const LS_TOKEN = "token";

export const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const VNDIRECT_ID_SERVICE =
  process.env.REACT_APP_PROFILE === "dev"
    ? "https://id-uat.vndirect.com.vn"
    : process.env.REACT_APP_PROFILE === "uat"
    ? "https://id-uat.vndirect.com.vn"
    : "https://id.vndirect.com.vn";
const API_SERVICE =
  process.env.REACT_APP_PROFILE === "dev"
    ? "https://gateway-dev.dhomes.com.vn"
    : process.env.REACT_APP_PROFILE === "uat"
    ? "https://gateway-uat.dhomes.com.vn"
    : "https://gateway.dhomes.com.vn";
const MEDIA_HOST =
  process.env.REACT_APP_PROFILE === "dev"
    ? "https://gateway-dev.dhomes.com.vn"
    : process.env.REACT_APP_PROFILE === "uat"
    ? "https://dhomes-gateway-uat.ivnd.com.vn"
    : "https://gateway.dhomes.com.vn";

export const GOOGLE_MAP_API_KEY = 'AIzaSyArtsHlll1wmxuYQcHw2m3YFoKaEwWo3fE';

export const VNDirectIdLink = VNDIRECT_ID_SERVICE;

export const APIHost = development ? "http://localhost:3000/api" : API_SERVICE;

export const MediaHost = MEDIA_HOST;

export const ROUTES = {
  login: "/login",
  project: "/project",
  projectListing: "/project/listing",
};

export const API = {
  authenVnDirectToken: (vnDirectToken: string) =>
    `${APIHost}/auth-service/api/v1/auth-by-vndid/jwt?tokenId=${vnDirectToken}`,
  searchDevelopers: (search: string) =>
    `${APIHost}/property-service/api/v1/developers?keyword=${search}&page=0&size=10`,
  getAllProvinces: `${APIHost}/property-service/api/v1/provinces/all`,
  searchDistricts: (provinceCode: string) =>
    `${APIHost}/property-service/api/v1/provinces/${provinceCode}/districts/all`,
  searchWards: (districtCode: string) =>
    `${APIHost}/property-service/api/v1/districts/${districtCode}/wards/all`,
  projectPropertyTypes: `${APIHost}/property-service/public/api/v1/projects/property-types`,
  projectUtilityTypes: `${APIHost}/property-service/public/api/v1/projects/utilities`,
  uploadImages: `${APIHost}/media-service/api/v1/images/upload`,
  saveDraftProject: `${APIHost}/property-service/api/v1/projects/draft`,
  verifyBasicProjectInfo: `${APIHost}/property-service/api/v1/projects/validate-info`,
  createProject: `${APIHost}/property-service/api/v1/projects/confirm`,
  getProject: (id: string) =>
    `${APIHost}/property-service/api/v1/projects/${id}`,
  editProject: (id: string) =>
    `${APIHost}/property-service/api/v1/projects/${id}/edit`,
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
