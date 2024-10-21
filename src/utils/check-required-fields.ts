import { ServerResponse } from "http";
import { IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../request-handler/request-handler.type";
import { sendError } from "./send-error";
import { RESPONSE_CODES } from "../constants/response-codes.constant";
import { getBadRequestFormatMessage, getBadRequestPropertiestMessage } from "./get-message";

export default function checkRequiredFields(data: IPostRequestRequiredProps, res: ServerResponse): boolean {
    const isDataObject = typeof data === 'object' && !Array.isArray(data) && data !== null;

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

export function getIsUsernameInCorrectFormat (username: IPostRequestRequiredProps['username']) {
    return typeof username === 'string';
}

export function getIsAgeInCorrectFormat (age: IPostRequestRequiredProps['age']) {
    return typeof age === 'number';
}

export function getIsHobbiesInCorrectFormat (hobbies: IPostRequestRequiredProps['hobbies']) {
    return Array.isArray(hobbies)
    && hobbies.every(hobby => typeof hobby === 'string');
}

function getIsUsernamePresentAndCorrect (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.USERNAME] && getIsUsernameInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.USERNAME]);
}

function getIsAgePresentAndCorrect (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.AGE] && getIsAgeInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.AGE]);
}

function getIsHobbiesPresentAndCorrect (data: IPostRequestRequiredProps) {
    return data[POST_REQ_REQUIRED_PROPS.HOBBIES]
    && getIsHobbiesInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.HOBBIES])
}
