import * as loginActions from '../actions/loginActions';
import actionTypes from '../actions/types';
import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { resolvePlugin } from '@babel/core';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */


// import { delay } from 'redux-saga';

// Our worker Saga that logins the user
export function* loginAsync(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(loginActions.loader("loader", false, actionTypes.LOADER))
    yield put(loginActions.loader("newLoader", false, actionTypes.NEW_LOADER))
    yield put(loginActions.updateBenifit('benifitObject', response.data, actionTypes.BENIFIT_OBJECT));
  } catch (e: any) {
    console.log('error', e.message)
  }
}

//send mobile number to server for OTP generation 
export function* callOtp(service: any, payload: object): any {

  try {
    console.log('call---', service)
    const response = yield call(service, payload);
    yield put(loginActions.loader("loader", false, actionTypes.LOADER))
    yield put(loginActions.loader("newLoader", false, actionTypes.NEW_LOADER))

    yield put(loginActions.otpData('otpData', response.data, actionTypes.OTP_DATA));

  } catch (e: any) {
    console.log('error', e.message)
  }
}

//send mobile number to server for OTP generation 
export function* referralCodeSaga(service: any, payload: object): any {

  try {
    const response = yield call(service, payload);
    yield put(loginActions.referralCodeData('referralCode', response.data, actionTypes.REFERRAL_CODE_DATA));

  } catch (e: any) {
    console.log('error', e.message)
  }
}

//send mobile number to server for OTP generation 
export function* verifyUserSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(loginActions.loader("newLoader", false, actionTypes.NEW_LOADER))
    yield put(loginActions.loader("loader", false, actionTypes.LOADER))
    if (response.data.status === 0) {
      yield put(loginActions.userData("otpDataError", response.data, actionTypes.BENIFIT_OBJECT))
    }
    else {
      yield put(loginActions.userData('userData', response.data, actionTypes.BENIFIT_OBJECT));
    }
    console.log(JSON.stringify(response.data), "response in saga")
  } catch (e: any) {
    console.log('error', e.message)
  }
}

export function* userDetailSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload)
    yield put(loginActions.loader("newLoader", false, actionTypes.NEW_LOADER))

    yield put(loginActions.userDetails("userDetails", response.data, actionTypes.FETCH_USER_DETAILS_DATA))
    yield put(loginActions.loader("loader", false, actionTypes.LOADER))
  }
  catch (e: any) {
    console.log("error", e.message)
  }
}


