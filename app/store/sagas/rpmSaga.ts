import * as rpmAction from '../actions/rpmAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get RPM Permission
export function* getRpmPermissionSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.getRpmPermissionData(
                'rpmpermission',
                response.data,
                actionTypes.RPM_GET_PERMISSION_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for post RPM Permission
export function* postRpmPermissionSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.postRpmPermissionData(
                'rpmPostpermission',
                response.data,
                actionTypes.RPM_POST_PERMISSION_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//get SOS Numbers
export function* getEmergencyContactsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.getEmergencyContactData(
                'soscontacts',
                response.data,
                actionTypes.FETCH_SOS_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//post SOS Numbers
export function* postEmergencyContactsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.postEmergencyContactData(
                'sos',
                response.data,
                actionTypes.CREATE_SOS_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}


//post SOS Numbers
export function* deleteEmergencyContactsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.deleteEmergencyContactData(
                'sos',
                response.data,
                actionTypes.DELETE_SOS_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//fetch rom data
export function* fetchRpmSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.fetchRpmData(
                'rpm',
                response.data,
                actionTypes.FETCH_RPM_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//post rpm data
export function* postRpmSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            rpmAction.postRpmData(
                'rpmData',
                response.data,
                actionTypes.POST_RPM_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}