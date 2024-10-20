export function getParsedJson(str: string): Object | null {
    try {
      const parsedJson = JSON.parse(str);
      return parsedJson;
      
    } catch (e) {
      return null;
    }
  }