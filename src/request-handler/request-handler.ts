import { IncomingMessage, ServerResponse } from "http"
import { getNormalizedUrl } from "../utils/get-normalized-url";
import { REQUEST_METHODS } from "./request-handler.type";
import handleRequestGet from "./handlers/request-handler-get";
import { sendError } from "../utils/send-error";
import { UNSUPPORTED_METHOD_ERROR } from "../utils/get-message";
import { RESPONSE_CODES } from "../constants/response-codes.constant";
import handleRequestPost from "./handlers/request-handler-post/request-handler-post";
import handleRequestPut from "./handlers/request-handler-put";
import handleRequestDelete from "./handlers/request-handler-delete";

export async function handleRequest (req: IncomingMessage, res: ServerResponse) {
    const normalizedUrl = getNormalizedUrl(req.url);

    switch (req.method) {
        case REQUEST_METHODS.GET:
            handleRequestGet(normalizedUrl, res);
            break;
        case REQUEST_METHODS.POST:
            handleRequestPost(normalizedUrl, req, res);
            break;
        case REQUEST_METHODS.PUT:
            handleRequestPut(normalizedUrl, req, res);
            break;
        case REQUEST_METHODS.DELETE:
            handleRequestDelete(normalizedUrl, res);
            break;
        default:
            sendError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, UNSUPPORTED_METHOD_ERROR);
    }
}