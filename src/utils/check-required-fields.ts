import { ServerResponse } from "http";
import { IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../request-handler/request-handler.type";
import { sendError } from "./send-error";
import { RESPONSE_CODES } from "../constants/response-codes.constant";
import { getBadRequestPropertiestMessage } from "./get-error-message";

export default function checkRequiredFields(data: IPostRequestRequiredProps, res: ServerResponse): boolean {
    const isDataObject = typeof data === 'object' && !Array.isArray(data) && data !== null;

    if (!isDataObject) {
        return false;
    }

    const correctObjectSize = 3;
    const isDataSizeCorrect = Object.keys(data).length === correctObjectSize;

    if (!isDataSizeCorrect){
        return false;
    }

    const incorrectPostProps = [];

    if (!getIsUsernameInCorrectFormat(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.USERNAME);
    }

    if (!getIsAgeInCorrectFormat(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.AGE);
    }

    if (!getIsHobbiesInCorrectFormat(data)){
        incorrectPostProps.push(POST_REQ_REQUIRED_PROPS.HOBBIES);
    }

    if (incorrectPostProps.length > 0) {
        sendError(res, RESPONSE_CODES.BAD_REQUEST, getBadRequestPropertiestMessage(incorrectPostProps));
        return false;
    }

    return true;
}

function getIsUsernameInCorrectFormat (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.USERNAME] && typeof data[POST_REQ_REQUIRED_PROPS.USERNAME] === 'string';
}

function getIsAgeInCorrectFormat (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.AGE] && typeof data[POST_REQ_REQUIRED_PROPS.AGE] === 'number';
}

function getIsHobbiesInCorrectFormat (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.HOBBIES]
    && Array.isArray(data[POST_REQ_REQUIRED_PROPS.HOBBIES])
    && data[POST_REQ_REQUIRED_PROPS.HOBBIES].every(item => typeof item === 'string');
}
