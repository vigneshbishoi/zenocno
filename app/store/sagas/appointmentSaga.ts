import * as appointmentAction from '../actions/appointmentAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get appointment data
export function* getMyAppointment(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.fetchAppointmentData("appointments", response.data, actionTypes.FETCH_APPOINTMENT_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get doctor data
export function* getDocotorList(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.fetchDoctorsData("doctors", response.data, actionTypes.FETCH_DOCTORS_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get doctor data
export function* getDocotorSearchList(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.fetchDoctorsSearchData("doctors", response.data, actionTypes.FETCH_DOCTORS_SEARCH_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get doctor schedule
export function* getDocotorSchedule(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.doctorScheduleData("schedule", response.data, actionTypes.DOCTOR_SCHEDULE_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get doctor detail
export function* getDocotorDetail(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.doctorDetailData("doctorDetail", response.data, actionTypes.DOCTOR_DETAIL_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for book Appointment
export function* bookAppointmentSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.bookAppointmentData("bookAppoinment", response.data, actionTypes.BOOK_APPOINTMENT_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get patient detail data
export function* getPatientDetailSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.setPatientDetailData("patientDetail", response.data, actionTypes.GET_PATIENT_DETAIL_DATA))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for cancel Appointment
export function* cancelAppointmentSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.cancelAppointmentData("cancelAppoinment", response.data, actionTypes.CANCEL_APPOINTMENT_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for reschedule Appointment
export function* rescheduleAppointmentSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.rescheduleAppointmentData("rescheduleAppoinment", response.data, actionTypes.RESCHEDULE_APPOINTMENT_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for docotor category
export function* docotorCategorySaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        response.data.data = [{
            "id": 0,
            "name": "All",
            "image": null
        }, ...response.data.data]
        yield put(appointmentAction.doctorCategoryData("docotorCategory", response.data, actionTypes.DOCTOR_CATEGORY_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for docotor review
export function* docotorReviewSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.docotorReviewData("docotorReview", response.data, actionTypes.DOCTOR_REVIEW_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for docotor review write
export function* writeReviewSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.writeReviewData("writeReview", response.data, actionTypes.WRITE_REVIEW_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for cancelOptions
export function* cancelOptionsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(appointmentAction.cancelOptionsData("cancelOptions", response.data, actionTypes.CANCEL_OPTIONS_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

export function* saveDoctorSaga(service: any, payload: object): any {

    console.log('service -->', service);
    console.log('payload -->', payload);


    try {
        const response = yield call(service, payload);

        console.log('RES---->', response);


        // yield put(
        //     appointmentAction.saveDoctorData(
        //         actionTypes.SAVE_CONDITION_DATA,
        //         response.data,
        //     ),
        // );
        // yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error DECTOR', e);
    }
}
