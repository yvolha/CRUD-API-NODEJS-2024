import { IPostRequestRequiredProps, POST_REQ_REQUIRED_PROPS } from "../request-handler/request-handler.type";

export default function checkRequiredFields(data: IPostRequestRequiredProps): boolean {
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

    if (data[POST_REQ_REQUIRED_PROPS.AGE]
        && typeof data[POST_REQ_REQUIRED_PROPS.AGE] === 'number'
        && data[POST_REQ_REQUIRED_PROPS.USERNAME]
        && typeof data[POST_REQ_REQUIRED_PROPS.USERNAME] === 'string'
        && data[POST_REQ_REQUIRED_PROPS.HOBBIES]
        && Array.isArray(data[POST_REQ_REQUIRED_PROPS.HOBBIES]
        && data[POST_REQ_REQUIRED_PROPS.HOBBIES].every(item => typeof item === 'string')
        )
    ) {
        return true;
    }
    
    return false;
}