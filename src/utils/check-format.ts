import { IPostRequestRequiredProps } from "../request-handler/request-handler.type";

export function getIsDataObject (data: unknown): boolean {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
}

export function getIsUsernameInCorrectFormat (username: IPostRequestRequiredProps['username']): boolean {
    return typeof username === 'string';
}

export function getIsAgeInCorrectFormat (age: IPostRequestRequiredProps['age']): boolean {
    return typeof age === 'number';
}

export function getIsHobbiesInCorrectFormat (hobbies: IPostRequestRequiredProps['hobbies']): boolean {
    return Array.isArray(hobbies)
    && hobbies.every(hobby => typeof hobby === 'string');
}