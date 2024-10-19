import { IncomingMessage, ServerResponse } from "http"
import { getNormalizedUrl } from "../utils/get-normalized-url";
import { REQUEST_METHODS } from "./request-handler.type";
import handleRequestGet from "./handlers/request-handler-get";
import { sendError } from "../utils/send-error";
import { UNSUPPORTED_METHOD_ERROR } from "../utils/get-error-message";
import { RESPONSE_CODES } from "../constants/response-codes.constant";
import handleRequestPost from "./handlers/request-handler-post";

export async function handleRequest (req: IncomingMessage, res: ServerResponse) {
    console.log(req.method, req.url, req.headers);

    const normalizedUrl = getNormalizedUrl(req.url);

    switch (req.method) {
        case REQUEST_METHODS.GET:
            handleRequestGet(normalizedUrl, res);
            break;
        case REQUEST_METHODS.POST:
            handleRequestPost(normalizedUrl, req, res);
            break;
        default:
            sendError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, UNSUPPORTED_METHOD_ERROR);
    }
}