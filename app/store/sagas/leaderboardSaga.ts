import * as leaderActions from '../actions/leaderboardAction';
import actionTypes from '../actions/types';
import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get all stories

export function* getLeaderboardSaga(service: any, payload: object): any {
  try {
    if (payload?.payload?.module != undefined) {
      const response = yield call(service, payload);

      yield put(
        leaderActions.getLeaderboardList(
          actionTypes.GET_LEADERBOARD_LIST,
          response.data
        ),
      );
    }
  } catch (e: any) {
    console.log('error', e.message);
  }
}