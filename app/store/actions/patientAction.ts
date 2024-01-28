
export function getPatientList(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function getPatientListData(
    index: string,
    data: object,
    type: string,
) {
    return {
        type: type,
        index,
        data,
    };
}

export function postPatientList(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function postPatientListData(
    index: string,
    data: object,
    type: string,
) {
    return {
        type: type,
        index,
        data,
    };
}

export function getReferalCode(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function getReferalCodeData(
    index: string,
    data: object,
    type: string,
) {
    return {
        type: type,
        index,
        data,
    };
}

export function getInvitedPatiets(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function getInvitedPatietsData(
    index: string,
    data: object,
    type: string,
) {
    return {
        type: type,
        index,
        data,
    };
}

export function deletePatient(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function deletePatientData(
    index: string,
    data: object,
    type: string,
) {
    return {
        type: type,
        index,
        data,
    };
}