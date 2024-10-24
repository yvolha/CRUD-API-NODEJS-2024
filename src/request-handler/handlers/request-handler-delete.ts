
import { ServerResponse } from "http";

import { DATABASE } from "../../database/database";
import { sendResponse } from "../../utils/send-response";
import { ENDPOINTS } from "../request-handler.type";
import getStandardizedPath from "../../utils/get-standardized-path";
import getLastUrlPart from "../../utils/get-last-url-part";
import getIsUuidValid from "../../utils/get-is-uuid";
import { sendError } from "../../utils/send-error";
import { RESPONSE_CODES } from "../../constants/response-codes.constant";
import { getBadRequestInvalidMessage, getNotFoundMessage, getUnsupportedEndpointMessage } from "../../utils/get-message";

export default function handleRequestDelete(path: string, res: ServerResponse) {

    if (getStandardizedPath(path) === ENDPOINTS.API_USERS_X) {
        const userId = getLastUrlPart(path);

        if (!getIsUuidValid(userId)) {
            sendError(res, RESPONSE_CODES.BAD_REQUEST, getBadRequestInvalidMessage(userId));
        } else {
            const user = DATABASE[userId];

            if (!user) {
                sendError(res, RESPONSE_CODES.NOT_FOUND, getNotFoundMessage(userId));
            } else {
                delete DATABASE[userId];
                sendResponse(res, {}, RESPONSE_CODES.NO_CONTENT);
            }
        }
    } else {
        sendError(res, RESPONSE_CODES.NOT_FOUND, getUnsupportedEndpointMessage(path));
    }
}
