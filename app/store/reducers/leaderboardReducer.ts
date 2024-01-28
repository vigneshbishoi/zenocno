import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';

export interface IStoriesState {
  data: [];
}

const initialState: IStoriesState = {
  data: []
};

export const leaderboardReducer = createReducer(initialState, {
  [actionTypes.GET_LEADERBOARD_LIST](state: IStoriesState, action: any) {
    return {
      ...state,
      data: action?.payload?.data,
    };
  },
});