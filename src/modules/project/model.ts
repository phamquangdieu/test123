import { some } from "../common/constants";
import { District, Province, Ward } from "../common/model";

export function generateProject(): Project {
  return {
    part1: {},
    part2: {},
    part3: { propertyTypes: [], utilities: [] },
    part4: { overviewImages: [], projectImages: [] },
  };
}

export function generateProjectValidation(): ProjectValidationError {
  return {
    part1: {
      name: "",
      administrator: "",
      area: "",
      commercialName: "",
      developer: "",
    },
    part2: {
      coord: "",
      city: "",
      district: "",
      ward: "",
      street: "",
      details: "",
    },
    part3: { propertyTypes: "", utilities: "" },
    part4: { mainImage: "", projectImages: "", overviewImages: "" },
  };
}

export interface Project {
  part1: ProjectPart1;
  part2: ProjectPart2;
  part3: ProjectPart3;
  part4: ProjectPart4;
}

export interface Developer {
  shortName: string;
  fullName: string;
}

export interface Coord {
  lat: number;
  lng: number;
}

export interface Location extends Coord {
  text: string;
}

export interface ProjectPart1 {
  name?: string;
  commercialName?: string;
  developer?: Developer;
  administrator?: string;
  area?: number;
}

export interface ValidProjectPart1 {
  name?: string;
  commercialName: string;
  developer: Developer;
  administrator?: string;
  area: number;
}

export interface ProjectPart1ValidationError {
  name: string;
  commercialName: string;
  developer: string;
  administrator: string;
  area: string;
}

export interface ProjectPart2 {
  coord?: Location;
  city?: Province;
  district?: District;
  ward?: Ward;
  street?: string;
  details?: string;
}

export interface ValidProjectPart2 {
  coord: Location;
  city: Province;
  district: District;
  ward: Ward;
  street: string;
  details: string;
}

export interface ProjectPart2ValidationError {
  coord: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  details?: string;
}

export interface ProjectPart3 {
  propertyTypes: PropertyTypeData[];
  utilities: UtilityTypeData[];
}

export interface ValidProjectPart3 {
  propertyTypes: PropertyTypeData[];
  utilities: UtilityTypeData[];
}

export interface ProjectPart3ValidationError {
  propertyTypes: string;
  utilities: string;
}

export interface ProjectImage {
  url: string;
  note: string;
}
export interface ProjectPart4 {
  mainImage?: ProjectImage;
  overviewImages: ProjectImage[];
  projectImages: ProjectImage[];
}

export interface ValidProjectPart4 {
  mainImage: ProjectImage;
  overviewImages: ProjectImage[];
  projectImages: ProjectImage[];
}

export interface ProjectPart4ValidationError {
  mainImage: string;
  overviewImages: string;
  projectImages: string;
}

export interface ProjectValidationError {
  part1: ProjectPart1ValidationError;
  part2: ProjectPart2ValidationError;
  part3: ProjectPart3ValidationError;
  part4: ProjectPart4ValidationError;
}

export interface PropertyTypeDesc {
  code: string;
  text: string;
}

export interface ProjectUtilityDesc {
  code: string;
  text: string;
}

export interface PropertyTypeData {
  code: string;
  quantity: number;
  exist: boolean;
}

export interface UtilityTypeData {
  code: string;
  text: string;
  exist: boolean;
}

export function convertProjectFromAPIModel(projectFromAPI: some): Project {
  return {
    part1: {
      name: projectFromAPI.name,
      commercialName: projectFromAPI.tradeName,
      administrator: projectFromAPI.management,
      area: projectFromAPI.area,
      developer: { fullName: projectFromAPI.developerFullName, shortName: projectFromAPI.developer },
    },
    part2: {
      city: projectFromAPI.province
        ? { code: "", name: projectFromAPI.province }
        : undefined,
      district: projectFromAPI.district
        ? { code: "", name: projectFromAPI.district }
        : undefined,
      ward: projectFromAPI.ward
        ? { code: "", name: projectFromAPI.ward }
        : undefined,
      street: projectFromAPI.street,
      details: projectFromAPI.address,
      coord:
        projectFromAPI.latitude !== undefined &&
        projectFromAPI.longitude !== undefined
          ? {
              lat: projectFromAPI.latitude,
              lng: projectFromAPI.longitude,
              text: projectFromAPI.place,
            }
          : undefined,
    },
    part3: {
      propertyTypes: projectFromAPI.propertyTypes
        ? projectFromAPI.propertyTypes.map((one: some) => ({
            exist: true,
            quantity: one.quantity,
            code: one.code,
          }))
        : [],
      utilities: projectFromAPI.utilities
        ? projectFromAPI.utilities.map((one: some) => ({
            exist: true,
            code: one.code,
          }))
        : [],
    },
    part4: {
      mainImage: {url: projectFromAPI.avatar, note: ''},
      overviewImages: projectFromAPI.images
        .filter((one: some) => one.code === "GROUND")
        .map((one: some) => ({ url: one.image, note: one.note })),
      projectImages: projectFromAPI.images
        .filter((one: some) => one.code === "PROJECT")
        .map((one: some) => ({ url: one.image, note: one.note })),
    },
  };
}

export function convertProjectToAPIModel(project: Project) {
  return {
    address: project.part2.details,
    area: project.part1.area,
    avatar: project.part4.mainImage?.url,
    developer: project.part1.developer?.shortName,
    district: project.part2.district?.name,
    images: project.part4.overviewImages
      .map((one) => ({ image: one.url, note: one.note, code: "GROUND" }))
      .concat(
        project.part4.projectImages.map((one) => ({
          image: one.url,
          note: one.note,
          code: "PROJECT",
        }))
      ),
    latitude: project.part2.coord?.lat,
    longitude: project.part2.coord?.lng,
    place: project.part2.coord?.text,
    management: project.part1.administrator,
    name: project.part1.name,
    propertyTypes: project.part3.propertyTypes.map((one) => ({
      code: one.code,
      quantity: one.quantity,
    })),
    province: project.part2.city?.name,
    street: project.part2.street,
    tradeName: project.part1.commercialName,
    utilities: project.part3.utilities.map((one) => ({ code: one.code })),
    ward: project.part2.ward?.name,
  };
}
