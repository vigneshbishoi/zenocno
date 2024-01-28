import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
export interface ISettingState {
  match: [];
}
const initialState: ISettingState = {
  match: [],
};

export const deactiviateAccountReducer = createReducer(initialState, {
  [actionTypes.DEACTIVATE_ACCOUNT](state: ISettingState, action: any) {
    return { ...state };
  },
});
export const deleteAccountReducer = createReducer(initialState, {
    [actionTypes.DELETE_ACCOUNT](state: ISettingState, action: any) {
      return { ...state };
    },
});
export const toggleNotificationReducer = createReducer(initialState, {
    [actionTypes.NOTIFICATION_TOGGLE](state: ISettingState, action: any) {
      return { ...state };
    },
});

