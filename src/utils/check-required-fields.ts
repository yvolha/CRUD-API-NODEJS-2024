export default function checkRequiredFields( data: unknown): boolean {
    const isDataObject = typeof data === 'object' && !Array.isArray(data) && data !== null;

    if (!isDataObject) {
        return false;
    }

    const correctObjectSize = 3;
    const isDataSizeCorrect = Object.keys(data).length === correctObjectSize;

    if (!isDataSizeCorrect){
        return false;
    }
    
    
    return true;
}