import { IncomingMessage } from "http"

export function handleRequest (req: IncomingMessage) {
    console.log(req.method, req.url, req.headers);
}