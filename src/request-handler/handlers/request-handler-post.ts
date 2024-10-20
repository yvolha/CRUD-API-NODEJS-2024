import { IncomingMessage, ServerResponse } from "node:http";
import { v6 as uuidv6 } from 'uuid';


import checkRequiredFields from "../../utils/check-required-fields";
import { ENDPOINTS, IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../request-handler.type";
import { getParsedJson } from "../../utils/get-parsed-json";
import { sendError } from "../../utils/send-error";
import { RESPONSE_CODES } from "../../constants/response-codes.constant";
import { getUnsupportedEndpointMessage, INCORRECT_JSON } from "../../utils/get-error-message";
import { DATABASE } from "../../database/database";

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
            console.log(data);

            const parsedJson = getParsedJson(data);

            if (!parsedJson) {
                sendError(res, RESPONSE_CODES.BAD_REQUEST, INCORRECT_JSON);
                return;
            }

            if (checkRequiredFields(data as unknown as IPostRequestRequiredProps, res)) {
                const newUserUuid = uuidv6();
                const userData = data as unknown as IPostRequestRequiredProps;

                DATABASE.newUserUuid = {
                    id: newUserUuid,
                    username: userData[POST_REQ_REQUIRED_PROPS.USERNAME],
                    age: userData[POST_REQ_REQUIRED_PROPS.AGE],
                    hobbies: userData[POST_REQ_REQUIRED_PROPS.HOBBIES],
                }

                console.log('DATABASE.newUserUuid', DATABASE.newUserUuid)
            }
        })

    } else {
        sendError(res, RESPONSE_CODES.NOT_FOUND, getUnsupportedEndpointMessage(path));
    }
}