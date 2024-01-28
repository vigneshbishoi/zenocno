//for Clinical Trials Data 
export function getCondition(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function getConditionData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
export function saveCondition(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function saveConditionData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
