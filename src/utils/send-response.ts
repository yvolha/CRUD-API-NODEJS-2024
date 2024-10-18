import { OutgoingHttpHeaders, ServerResponse } from "http";

export const sendResponse = (
    res: ServerResponse, 
    data?: unknown, 
    statusCode?: number,
    headers: OutgoingHttpHeaders = { 'Content-Type': 'application/json' },
) => {
    res.writeHead(statusCode || 200, headers);
    res.end(JSON.stringify(data));
  };
