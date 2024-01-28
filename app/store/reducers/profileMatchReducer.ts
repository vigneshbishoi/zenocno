import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
import { ISearchState } from '../../models/reducers/onboarding';
export interface IStoriesState {
  match: [];
  treatment: [];
}

const initialState: IStoriesState = {
  match: [],
  treatment: []
};

export const profileMatchReducer = createReducer(initialState, {
  [actionTypes.GET_PROFILE_MATCH_LIST](state: IStoriesState, action: any) {
    
    return {
      ...state,
      match: action?.payload?.match_profile,
    };
  },
  [actionTypes.GET_TREATMENT_LIST](state: IStoriesState, action: any) {
    
    return {
      ...state,
      treatment: action?.payload?.data,
    };
  },

});
