import * as journalActions from '../actions/journalActions';
import actionTypes from '../actions/types';
import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { resolvePlugin } from '@babel/core';
import { storiesReducer } from '../reducers/storiesReducer';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getJournalSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        journalActions.getJournalList(
          actionTypes.GET_JOURNAL_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getJournalItemSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        journalActions.getJournalItem(
          actionTypes.GET_JOURNAL_ITEM,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getJournalCategorySaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        journalActions.getJournalCategoryList(
          actionTypes.GET_JOURNAL_CATEGORY_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getJournalSearchSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        journalActions.getJournalSearchList(
          actionTypes.GET_JOURNAL_SEARCH_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}

export function* getSymptomsSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        journalActions.getSymptomsList(
          actionTypes.GET_SYMPTOMS_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}