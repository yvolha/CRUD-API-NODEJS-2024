
import { ServerResponse } from "http";

import { DATABASE } from "../../database/database";
import { sendResponse } from "../../utils/send-response";
import { ENDPOINTS } from "../request-handler.type";
import getStandardizedPath from "../../utils/get-standardized-path";
import getLastUrlPart from "../../utils/get-last-url-part";

export default async function handleRequestGet(path: string, res: ServerResponse) {

    if (path === ENDPOINTS.API_USERS) {
        sendResponse(res, DATABASE, 200);
    } else if (getStandardizedPath(path) === ENDPOINTS.API_USERS_X) {
        const userId = getLastUrlPart(path);
    }


    
}