export function generateProject(): Project {
  return {
    part1: {},
    part2: {},
    part3: {},
    part4: {},
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
    part2: { coord: "", city: "", district: "", ward: "", street: "", details: "" },
    part3: {},
    part4: {},
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
  lon: number;
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
  area?: number;
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
  city?: string;
  district?: string;
  ward?: string;
  street?: string;
  details?: string;
}

export interface ValidProjectPart2 {
  coord: Location;
  city: string;
  district: string;
  ward: string;
  street: string;
  details?: string;
}

export interface ProjectPart2ValidationError {
  coord: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  details?: string;
}

export interface ProjectPart3 {}

export interface ValidProjectPart3 {}

export interface ProjectPart3ValidationError {}

export interface ProjectPart4 {}

export interface ValidProjectPart4 {}

export interface ProjectPart4ValidationError {}

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
  id: number;
  name: string;
}