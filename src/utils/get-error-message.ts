import { POST_REQUEST_REQUIRED_PROPERTIES } from "../components/request-handler.constant";

export function getNotFoundMessage(userId: string){
    return `The user with userId ${userId} does not exist.`
}

export function getBadRequestInvalidMessage(userId: string){
    return `The userId ${userId} is invalid (not uuid).`
}

export function getBadRequestInsufficientMessage(){
    return `The request does not include all the required properties: ${POST_REQUEST_REQUIRED_PROPERTIES.join(' ')}.`
}

export const INTERNAL_SERVER_ERROR = 'An internal server error has occured.';