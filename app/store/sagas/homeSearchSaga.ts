import * as getHomeSearchList from '../actions/homeSearch';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getHomeSearchSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);
      yield put({
        type: actionTypes.GET_HOME_SEARCH_LIST,
        Data: {
          response: response?.data,
          service: payload?.payload?.action
        }
      });
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}