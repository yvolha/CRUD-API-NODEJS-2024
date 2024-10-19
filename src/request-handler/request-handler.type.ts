export enum POST_REQ_REQUIRED_PROPS {
    USERNAME = 'username',
    AGE = 'age',
    HOBBIES = 'hobbies',
}

export interface IPostRequestRequiredProps {
    [POST_REQ_REQUIRED_PROPS.USERNAME]: string;
    [POST_REQ_REQUIRED_PROPS.AGE]: number;
    [POST_REQ_REQUIRED_PROPS.HOBBIES]: string[];
}

export enum REQUEST_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ENDPOINTS {
    API_USERS = '/api/users',
    API_USERS_X = '/api/users/*',
}