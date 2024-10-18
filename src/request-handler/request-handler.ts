import { IncomingMessage, ServerResponse } from "http"
import { getNormalizedUrl } from "../utils/get-normalized-url";
import { REQUEST_METHODS } from "./request-handler.type";
import handleRequestGet from "./handlers/request-handler-get";
import { sendError } from "../utils/send-error";
import { UNSUPPORTED_METHOD_ERROR } from "../utils/get-error-message";

export async function handleRequest (req: IncomingMessage, res: ServerResponse) {
    console.log(req.method, req.url, req.headers);

    const normalizedUrl = getNormalizedUrl(req.url);

    switch (req.method) {
        case REQUEST_METHODS.GET:
            await handleRequestGet(normalizedUrl, res);
            break;
        default:
            sendError(res, 500, UNSUPPORTED_METHOD_ERROR);
    }
}