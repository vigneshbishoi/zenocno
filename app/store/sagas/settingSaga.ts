import { put, call } from 'redux-saga/effects';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */


export function* deactivateAccountSaga(service: any, payload: object): any {
  try {
      const response = yield call(service, payload);
  } catch (e: any) {
    console.log('error', e.message);
  }
}
export function* deleteAccountSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
    } catch (e: any) {
      console.log('error', e.message);
    }
}
export function* notificationToogleSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
    } catch (e: any) {
      console.log('error', e.message);
    }
}