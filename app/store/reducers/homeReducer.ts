import createReducer from '../../lib/createReducer';
import { IHomeState } from '../../models/reducers/home';
import actionTypes from '../actions/types';

const initialState: IHomeState = {
    data: {},
  };

export const homeReducer = createReducer(initialState, {
    [actionTypes.LOADER](state: IHomeState, action: any) {
      return {
        ...state,
        [action.index]: action.data,
      };
    },
  
    //for all stories
    [actionTypes.ALL_HOME](state: IHomeState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.ALL_HOME_DATA](state: IHomeState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },
  });