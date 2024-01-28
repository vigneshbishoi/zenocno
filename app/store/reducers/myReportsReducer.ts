import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
import { ISearchState } from '../../models/reducers/onboarding';

export interface IStoriesState {
  data: [];
  category: [];
  filterData: [];
  loader: boolean;
}

const initialState: IStoriesState = {
  data: [],
  category: [],
  filterData: [],
  loader: true
};

export const myReportsReducer = createReducer(initialState, {
  [actionTypes.GET_MY_REPORTS_LIST](state: IStoriesState, action: any) {
    let ApiData = action?.payload?.data
    let Action = action?.payload?.action
    return {
      ...state,
      data: ApiData,
      loader: (Action == undefined && ApiData == null) || (Action == undefined && ApiData.length > 0)
        ? false : true
    };
  },
  [actionTypes.GET_REPORTS_CATEGORY_LIST](state: IStoriesState, action: any) {
    return {
      ...state,
      category: action?.payload?.data,
    };
  },
  [actionTypes.GET_REPORTS_FILTER_LIST](state: IStoriesState, action: any) {
    let user_document = action?.payload?.data
    let Action = action?.payload?.action
    return {
      ...state,
      data: user_document != undefined && user_document != null ?
        user_document : null,
      loader: Action == undefined ? false : true
    };
  },
});