import { URL_SEPARATOR } from "../constants/constants";

export function getNormalizedUrl(url: string | undefined): string {
    let normalizedUrl = url?.trim();
    
    if (normalizedUrl?.endsWith(URL_SEPARATOR)) {
        normalizedUrl = normalizedUrl.slice(0, -1);
    }

    return normalizedUrl || '';
}