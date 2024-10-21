import { IncomingMessage, ServerResponse } from "node:http";
import { v6 as uuidv6 } from 'uuid';


import checkRequiredFields from "./request-handler-post/check-required-fields";
import { ENDPOINTS, IPostRequestRequiredProps } from "../request-handler.type";
import { getParsedJson } from "../../utils/get-parsed-json";
import { sendError } from "../../utils/send-error";
import { RESPONSE_CODES } from "../../constants/response-codes.constant";
import { getBadRequestInvalidMessage, getNotFoundMessage, getUnsupportedEndpointMessage, INCORRECT_JSON } from "../../utils/get-message";
import { DATABASE } from "../../database/database";
import { sendResponse } from "../../utils/send-response";
import getStandardizedPath from "../../utils/get-standardized-path";
import getLastUrlPart from "../../utils/get-last-url-part";
import getIsUuidValid from "../../utils/get-is-uuid";

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
            const user = DATABASE[userId];

            if (!user) {
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

                    if (checkRequiredFields(parsedJson as unknown as IPostRequestRequiredProps, res)) {
                        const newUserUuid = uuidv6();
                        const userData = parsedJson as unknown as IPostRequestRequiredProps;

                        const newUser = {
                            id: newUserUuid,
                            ...userData,
                        }

                        DATABASE[newUserUuid] = newUser;

                        sendResponse(res, newUser, RESPONSE_CODES.CREATED);
                    }
                })


                sendResponse(res, user);
            }
        }

    } else {
        sendError(res, RESPONSE_CODES.NOT_FOUND, getUnsupportedEndpointMessage(path));
    }
}