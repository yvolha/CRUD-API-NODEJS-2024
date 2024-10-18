import { validate } from "uuid";

export const isUuidValid = (value: unknown) => {
  if (typeof value === "string") {
    return validate(value);
  } 
  
  return false;
};