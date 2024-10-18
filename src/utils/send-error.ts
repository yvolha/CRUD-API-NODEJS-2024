import { ServerResponse } from "http";

export const sendError = (
    res: ServerResponse, 
    statusCode: number,
    message: string,
) => {
    console.log('im here')
    res.statusCode = statusCode;
    res.end(JSON.stringify({ message }));
};