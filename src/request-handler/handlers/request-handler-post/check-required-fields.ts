import { ServerResponse } from "http";
import { IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../../request-handler.type";
import { sendError } from "../../../utils/send-error";
import { RESPONSE_CODES } from "../../../constants/response-codes.constant";
import { getBadRequestFormatMessage, getBadRequestPropertiestMessage } from "../../../utils/get-message";
import { getIsAgePresentAndCorrect, getIsDataObject, getIsHobbiesPresentAndCorrect, getIsUsernamePresentAndCorrect } from "../../../utils/check-format";

export default function checkRequiredFields(data: IPostRequestRequiredProps, res: ServerResponse): boolean {
    const isDataObject = getIsDataObject(data);

    const correctObjectSize = 3;
    const isDataSizeCorrect = Object.keys(data)?.length === correctObjectSize;

    if (!isDataSizeCorrect || !isDataObject) {
        sendError(res, RESPONSE_CODES.BAD_REQUEST, getBadRequestFormatMessage());
        return false;
    }

    const incorrectPostProps = [];

    if (!getIsUsernamePresentAndCorrect(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.USERNAME);
    }

    if (!getIsAgePresentAndCorrect(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.AGE);
    }

    if (!getIsHobbiesPresentAndCorrect(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.HOBBIES);
    }

    if (incorrectPostProps.length > 0) {
        sendError(res, RESPONSE_CODES.BAD_REQUEST, getBadRequestPropertiestMessage(incorrectPostProps));
        return false;
    }

    return true;
}
