import { validate } from "uuid";

export default function getIsUuidValid (value: unknown) {
  if (typeof value === "string") {
    return validate(value);
  } 
  
  return false;
};