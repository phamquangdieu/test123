import { some } from "./constants";

export function validValidation(validation: some): boolean {
  const values = Object.values(validation);
  for (const value of values) {
    if (typeof value === "string") {
      if (value) {
        return false;
      }
    } else {
      return validValidation(value);
    }
  }
  return true;
}
