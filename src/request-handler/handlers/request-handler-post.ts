import { IncomingMessage, ServerResponse } from "node:http";
import checkRequiredFields from "../../utils/check-required-fields";
import { IPostRequestRequiredProps } from "../request-handler.type";

export default function handleRequestPost (
    path: string,
    req: IncomingMessage,
    res: ServerResponse,
) {
    let data = '';

    req.on('data', (chunk) => {
        if (chunk) {
            data = data += chunk;
        }
    });

    req.on('end', () => {
        console.log(data);

        if (checkRequiredFields(data as unknown as IPostRequestRequiredProps, res)) {

        }
    })
}