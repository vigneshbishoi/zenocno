import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
export interface IStoriesState {
  data: object;
  loader: boolean;
}

const initialState: IStoriesState = {
  data: {},
  loader: true
};

export const homeSearchReducer = createReducer(initialState, {
  [actionTypes.GET_HOME_SEARCH_LIST](state: IStoriesState, action: any) {
    // let ApiData = action?.payload?.data
    // let Action = action?.payload?.action

    return {
      ...state,
      data: action,
      // loader: (Action == undefined && ApiData == null) || (Action == undefined && ApiData.length > 0)
      //   ? false : true
    };
  },
});
