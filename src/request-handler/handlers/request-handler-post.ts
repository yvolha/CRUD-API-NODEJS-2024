import { IncomingMessage, ServerResponse } from "node:http";
import { v6 as uuidv6 } from 'uuid';


import checkRequiredFields from "../../utils/check-required-fields";
import { ENDPOINTS, IPostRequestRequiredProps } from "../request-handler.type";
import { getParsedJson } from "../../utils/get-parsed-json";
import { sendError } from "../../utils/send-error";
import { RESPONSE_CODES } from "../../constants/response-codes.constant";
import { getUnsupportedEndpointMessage, INCORRECT_JSON } from "../../utils/get-message";
import { DATABASE } from "../../database/database";
import { sendResponse } from "../../utils/send-response";

export default function handleRequestPost (
    path: string,
    req: IncomingMessage,
    res: ServerResponse,
) {
    if (path === ENDPOINTS.API_USERS) {
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

    } else {
        sendError(res, RESPONSE_CODES.NOT_FOUND, getUnsupportedEndpointMessage(path));
    }
}