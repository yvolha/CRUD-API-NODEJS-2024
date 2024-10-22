import { IPostRequestRequiredProps } from "../request-handler/request-handler.type";

export function getParsedJson(str: string): IPostRequestRequiredProps | null {
    try {
      const parsedJson = JSON.parse(str);
      return parsedJson;
      
    } catch (e) {
      return null;
    }
  }