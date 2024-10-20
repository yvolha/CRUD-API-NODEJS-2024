
export function getNotFoundMessage(userId: string) {
    return `The user with userId '${userId}' does not exist.`;
}

export function getBadRequestInvalidMessage(userId: string) {
    return `The userId '${userId}' is invalid (not uuid).`;
}

export function getBadRequestPropertiestMessage(incorrectProps: string[]) {
    return `The request does not include the required properties, or has errors in the listed properties: ${incorrectProps.join(', ')}.`;
}

export function getBadRequestFormatMessage() {
    return 'The request body is not an object in the required format, or it may contain fewer or more properties than required.';
}

export function getUnsupportedEndpointMessage(path: string) {
    return `The request endpoint '${path}' is not supported, please make a request to the existing endpoint.`;
}

export const INTERNAL_SERVER_ERROR = 'An internal server error has occured.';

export const UNSUPPORTED_METHOD_ERROR = 'This method is not supported; please send a request with one of the supported methods: GET, POST, PUT, DELETE.';
