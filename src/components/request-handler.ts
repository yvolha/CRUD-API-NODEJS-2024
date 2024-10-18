import { IncomingMessage } from "http"
import { getNormalizedUrl } from "../utils/get-normalized-url";

export function handleRequest (req: IncomingMessage) {
    console.log(req.method, req.url, req.headers);

    const normalizedUrl = getNormalizedUrl(req.url);
}