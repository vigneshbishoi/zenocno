import * as getOncologist from '../actions/oncologistActions';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getOncologistSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put({
        type: actionTypes.GET_ONCOLOGIST_LIST,
        Data: {
          response: response?.data?.message,
          service: payload?.payload?.action
        }
      });
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getOncologistFilterSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put({
        type: actionTypes.GET_ONCOLOGIST_FILTER_LIST,
        Data: {
          response: response?.data?.message,
          service: payload?.payload?.action
        }
      });
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getOncologistDrSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put({
        type: actionTypes.GET_ONCOLOGIST_DR,
        Data: {
          response: response?.data?.message,
          service: payload?.payload?.action
        }
      });
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getSpecializationSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put({
        type: actionTypes.GET_SPECIALIZATION_LIST,
        Data: {
          response: response?.data?.message,
          service: payload?.payload?.action
        }
      });
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}