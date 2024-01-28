import * as homeAction from '../actions/homeAction';
import actionTypes from '../actions/types';
import {put, call} from 'redux-saga/effects';


//for get all Home
export function* getAllHomeSaga(service: any, payload: object): any {
    try {
      const response = yield call(service, payload);
      yield put(
        homeAction.allHomeData(
          'allHomeData',
          response.data,
          actionTypes.ALL_HOME_DATA,
        ),
      );
      yield put(homeAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
      console.log('error', e.message);
    }
  }