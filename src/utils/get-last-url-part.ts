import { URL_SEPARATOR } from "../constants/constants";

export default function getLastUrlPart(path: string): string {
    return path.split(URL_SEPARATOR).pop() || '';
}