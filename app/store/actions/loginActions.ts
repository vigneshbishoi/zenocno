/*
 * Reducer actions related with login
 */
import actionTypes from './types';

import { ILoginResponse } from '../../models/api/login';

// loader for allover app
export function loader(index: string, data: boolean, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function newLoader(index: string, data: boolean, type: string) {
  return {
    type: type,
    index,
    data,
  }
}
export function noInternet(index: string, data: boolean, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
export function loggedIn(index: string, data: boolean, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
export function updateBenifit(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}

export function getBenefit(type: string, payload: any) {
  return {
    type,
    payload
  };
}
export function callOtp(type: string, payload: any) {
  return {
    type,
    payload
  };
}

export function referralCode(type: string, payload: any) {
  return {
    type,
    payload
  };
}
export function referralCodeData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
export function verifyUser(type: string, payload: any) {
  return {
    type,
    payload
  };
}
export function otpData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}
export function getUserDetails(type: string, payload: any) {
  return {
    type,
    payload
  }
}
export function userDetails(index: string, data: Object, type: string) {
  return {
    type: type,
    index,
    data
  }
}
export function userData(index: string, data: object, type: string) {
  return {
    type: type,
    index,
    data,
  };
}




// export function disableLoader() {
//   return {
//     type: types.LOGIN_DISABLE_LOADER,
//   };
// }

