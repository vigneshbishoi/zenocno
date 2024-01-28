import * as ReportActions from '../actions/myReportsAction';
import actionTypes from '../actions/types';
import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getMyReportsSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        ReportActions.getMyReportsList(
          actionTypes.GET_MY_REPORTS_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getReportsCategorySaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        ReportActions.getReportCategoryList(
          actionTypes.GET_REPORTS_CATEGORY_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getReportFilterSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        ReportActions.getReportFilterList(
          actionTypes.GET_REPORTS_FILTER_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}