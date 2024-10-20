import { PATH_LAST_PART_REGEXP } from "../constants/constants";

export default function getStandardizedPath (path: string): string {
    return path.replace(PATH_LAST_PART_REGEXP, '*');
}