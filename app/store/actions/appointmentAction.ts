export function fetchAppointment(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function fetchAppointmentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function fetchDoctors(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function fetchDoctorsSearch(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function fetchDoctorsSearchData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    };
}
export function fetchDoctorsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function doctorSchedule(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function doctorScheduleData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function doctorDetail(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function doctorDetailData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function bookAppointment(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function bookAppointmentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function getPatientDetailData(type: string, payload: any, data: any) {
    return {
        type,
        payload,
        data
    };
}

export function setPatientDetailData(index: string, data: any, type: string) {
    return {
        type: type,
        index,
        data
    };
}

export function rescheduleAppointment(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function rescheduleAppointmentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function cancelAppointment(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function cancelAppointmentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function doctorCategory(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function doctorCategoryData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function docotorReview(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function docotorReviewData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function writeReview(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function writeReviewData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function cancelOptions(type: string, payload: any) {
    return {
        type,
        payload,
    };
}
export function cancelOptionsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function saveDoctorData(
    type: string,
    data: object,
) {
    return {
        type: type,
        data,
    };
}