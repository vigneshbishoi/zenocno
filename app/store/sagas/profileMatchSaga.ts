import * as profileMatch from '../actions/profileMatchActions';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getProfileMatchSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        profileMatch.getProfileMatchList(
          actionTypes.GET_PROFILE_MATCH_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getTreatmentSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put(
        profileMatch.getTreatmentList(
          actionTypes.GET_TREATMENT_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}