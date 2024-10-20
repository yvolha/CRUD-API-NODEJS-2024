import { ServerResponse } from "http";

export const sendError = (
    res: ServerResponse, 
    statusCode: number,
    message: string,
) => {
    res.statusCode = statusCode;
    res.end(JSON.stringify({ message }));
};