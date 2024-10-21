import { IncomingMessage, ServerResponse } from "node:http";

import { ENDPOINTS} from "../request-handler.type";
import { getParsedJson } from "../../utils/get-parsed-json";
import { sendError } from "../../utils/send-error";
import { RESPONSE_CODES } from "../../constants/response-codes.constant";
import { getBadRequestInvalidMessage, getNotFoundMessage, getUnsupportedEndpointMessage, INCORRECT_JSON } from "../../utils/get-message";
import { DATABASE } from "../../database/database";
import { sendResponse } from "../../utils/send-response";
import getStandardizedPath from "../../utils/get-standardized-path";
import getLastUrlPart from "../../utils/get-last-url-part";
import getIsUuidValid from "../../utils/get-is-uuid";
import { getIsAgePresentAndCorrect, getIsHobbiesPresentAndCorrect, getIsUsernamePresentAndCorrect } from "../../utils/check-format";

export default function handleRequestPut (
    path: string,
    req: IncomingMessage,
    res: ServerResponse,
) {
    if (getStandardizedPath(path) === ENDPOINTS.API_USERS_X) {
        const userId = getLastUrlPart(path);

        if (!getIsUuidValid(userId)) {
            sendError(res, RESPONSE_CODES.BAD_REQUEST, getBadRequestInvalidMessage(userId));
        } else {
            const userToUpdate = DATABASE[userId];

            if (!userToUpdate) {
                sendError(res, RESPONSE_CODES.NOT_FOUND, getNotFoundMessage(userId));
            } else {
                let data = '';

                req.on('data', (chunk) => {
                    if (chunk) {
                        data = data += chunk;
                    }
                });

                req.on('end', () => {
                    const parsedJson = getParsedJson(data);

                    if (!parsedJson) {
                        sendError(res, RESPONSE_CODES.BAD_REQUEST, INCORRECT_JSON);
                        return;
                    }
                    
                    if (getIsUsernamePresentAndCorrect(parsedJson)) {
                        userToUpdate.username = parsedJson.username;
                    }

                    if (getIsAgePresentAndCorrect(parsedJson)) {
                        userToUpdate.age = parsedJson.age;
                    }

                    if (getIsHobbiesPresentAndCorrect(parsedJson)){
                        userToUpdate.hobbies = parsedJson.hobbies;
                    }

                    sendResponse(res, userToUpdate, RESPONSE_CODES.OK);
                })
            }
        }

    } else {
        sendError(res, RESPONSE_CODES.NOT_FOUND, getUnsupportedEndpointMessage(path));
    }
}