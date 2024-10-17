import { OutgoingHttpHeaders, ServerResponse } from "http";

export const sendRes = (
    res: ServerResponse, 
    data?: unknown, 
    headers?: OutgoingHttpHeaders,
    statusCode?: number,
) => {
    const statCode = statusCode || 200;
    res.writeHead(statCode, headers);
    res.end(JSON.stringify(data));
  };
