import actionTypes from '../actions/types';

import {
  ILoginRequestState,
  ILoginResponseState,
} from '../../models/actions/login';

import { ILoginState } from '../../models/reducers/login';
/* Login Reducer
 * handles login states in the app
 */
import createReducer from '../../lib/createReducer';

const initialState: ILoginState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  password: '',
  status: 0,
  active: false

};


export const loginReducer = createReducer(initialState, {

  [actionTypes.LOADER](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.NEW_LOADER](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    }
  },
  [actionTypes.INTERNET](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.LOGIN_STATUS](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  }, [actionTypes.UPDATE_BENIFIT](state: ILoginState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.BENIFIT_OBJECT](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.CALL_OTP](state: ILoginState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.REFERRAL_CODE](state: ILoginState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.V_USER](state: ILoginState, action: any) {
    return {
      ...state,
    };
  },
  [actionTypes.OTP_DATA](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.REFERRAL_CODE_DATA](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.USER_DATA](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    };
  },
  [actionTypes.FETCH_USER_DETAILS](state: ILoginState, action: any) {
    return {
      ...state
    }
  },
  [actionTypes.FETCH_USER_DETAILS_DATA](state: ILoginState, action: any) {
    return {
      ...state,
      [action.index]: action.data
    }
  }
});
