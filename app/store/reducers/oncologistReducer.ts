import actionTypes from '../actions/types';

/* Reducer for geting all cancer list
 *
 */

import createReducer from '../../lib/createReducer';
export interface IStoriesState {
  oncologist: [];
  oncologistfilter: [];
  oncologistDr: [];
  specialization: [];
}

const initialState: IStoriesState = {
  oncologist: [],
  oncologistfilter: [],
  oncologistDr: [],
  specialization: []
};

export const oncologistReducer = createReducer(initialState, {
  [actionTypes.GET_ONCOLOGIST_LIST](state: IStoriesState, action: any) {
    let Data = action?.Data?.response
    let service = action?.Data?.service
    let stateArr = state?.oncologist
    return {
      ...state,
      oncologist: (Data != undefined && service != undefined
        && service == 'get_onco_list?page=1') ? Data : (stateArr?.length >= 1 && Data != undefined
          && service != undefined && service != 'get_onco_list?page=1') ?
        stateArr.concat(Data) : stateArr,
    };
  },

  [actionTypes.GET_ONCOLOGIST_FILTER_LIST](state: IStoriesState, action: any) {
    return {
      ...state,
      oncologistfilter: action?.Data?.response
    };
  },
  [actionTypes.GET_ONCOLOGIST_DR](state: IStoriesState, action: any) {
    return {
      ...state,
      oncologistDr: action?.Data?.response
    };
  },
  [actionTypes.GET_SPECIALIZATION_LIST](state: IStoriesState, action: any) {
    return {
      ...state,
      specialization: action?.Data?.response
    };
  },
});
