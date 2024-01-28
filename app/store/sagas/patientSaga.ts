import * as patientAction from '../actions/patientAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for fetch patients
export function* fetchPatientSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            patientAction.getPatientListData(
                'patients',
                response.data,
                actionTypes.FETCH_PATIENT_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for post patient data
export function* postPatientSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            patientAction.postPatientListData(
                'patient',
                response.data,
                actionTypes.POST_PATIENT_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for fetch patient referal data
export function* patientReferalSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            patientAction.getReferalCodeData(
                'referal',
                response.data,
                actionTypes.PATIENT_REFERAL_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for fetch invited patients
export function* invitedPatientsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            patientAction.getInvitedPatietsData(
                'invitedPatients',
                response.data,
                actionTypes.INVITED_PATIENT_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for fetch invited patients
export function* deletePatientSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            patientAction.deletePatientData(
                'deletePatient',
                response.data,
                actionTypes.DELETE_PATIENT_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}
