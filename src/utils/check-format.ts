import { IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../request-handler/request-handler.type";

export function getIsDataObject (data: unknown): boolean {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
}

export function getIsUsernamePresentAndCorrect (data: IPostRequestRequiredProps): boolean {
    return Boolean(data[POST_REQ_REQUIRED_PROPS.USERNAME] && getIsUsernameInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.USERNAME]));
}

export function getIsAgePresentAndCorrect (data: IPostRequestRequiredProps): boolean {
    return Boolean(data[POST_REQ_REQUIRED_PROPS.AGE] && getIsAgeInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.AGE]));
}

export function getIsHobbiesPresentAndCorrect (data: IPostRequestRequiredProps): boolean {
    return data[POST_REQ_REQUIRED_PROPS.HOBBIES]
    && getIsHobbiesInCorrectFormat(data[POST_REQ_REQUIRED_PROPS.HOBBIES])
}

function getIsUsernameInCorrectFormat (username: IPostRequestRequiredProps['username']): boolean {
    return typeof username === 'string';
}

function getIsAgeInCorrectFormat (age: IPostRequestRequiredProps['age']): boolean {
    return typeof age === 'number';
}

function getIsHobbiesInCorrectFormat (hobbies: IPostRequestRequiredProps['hobbies']): boolean {
    return Array.isArray(hobbies)
    && hobbies.every(hobby => typeof hobby === 'string');
}
