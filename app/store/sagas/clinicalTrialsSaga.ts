import * as clinicalTrialsAction from '../actions/clinicalTrialsAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get calendar data
export function* getConditionSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(clinicalTrialsAction.getConditionData("conditionData", response.data, actionTypes.GET_CONDITION_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* saveConditionSaga(service: any, payload: object): any {
    try {
        console.log("service ",payload,service)
        const response = yield call(service, payload)
        yield put(clinicalTrialsAction.saveConditionData("saveConditionData", response.data, actionTypes.SAVE_CONDITION_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

// //for add calendar data
// export function* addCalendarSaga(service: any, payload: object): any {
//     try {
//         const response = yield call(service, payload)
//         yield put(clinicalTrialsAction.addCalendarData("addCalendarData", response.data, actionTypes.ADD_CALENDAR_DATA))
//     }
//     catch (e: any) {
//         console.log("error", e.message)
//     }
// }