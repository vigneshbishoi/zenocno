import actionTypes from '../actions/types';

import {
  IStoriesRequestState,
  IStoriesResponseState,
} from '../../models/actions/stories';


/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
import { ISearchState } from '../../models/reducers/onboarding';
export interface IStoriesState {
  data: [];
  symptoms: [];
  loader: boolean;
  journalCate: [];
  searchData: [];
  journalItem: object
}

const initialState: IStoriesState = {
  data: [],
  symptoms: [],
  loader: true,
  journalCate: [],
  searchData: [],
  journalItem: {}
};

export const journalReducer = createReducer(initialState, {
  [actionTypes.GET_JOURNAL_LIST](state: IStoriesState, action: any) {
    let ApiData = action?.payload?.data
    let Action = action?.payload?.action
    return {
      ...state,
      data: action?.payload?.data,
      loader: (Action == undefined && ApiData == null) || (Action == undefined && ApiData.length > 0)
        ? false : true
    };
  },
  [actionTypes.GET_JOURNAL_CATEGORY_LIST](state: IStoriesState, action: any) {
    let ApiData = action?.payload?.data
    let Action = action?.payload?.action
    return {
      ...state,
      journalCate: action?.payload?.data,
    };
  },
  [actionTypes.GET_JOURNAL_ITEM](state: IStoriesState, action: any) {
    return {
      ...state,
      journalItem: action?.payload?.data,
    };
  },
  [actionTypes.GET_JOURNAL_SEARCH_LIST](state: IStoriesState, action: any) {
    let ApiData = action?.payload?.data
    let Action = action?.payload?.action
    return {
      ...state,
      searchData: action?.payload?.data,
    };
  },
  [actionTypes.GET_SYMPTOMS_LIST](state: IStoriesState, action: any) {
    return {
      ...state,
      symptoms: action?.payload?.data,
    };
  },

});
