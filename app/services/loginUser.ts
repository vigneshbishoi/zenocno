import ApiConfig from '../config/api-config';
import request from '../services/client';
import axios from 'axios';
import appConfig from '../../app/config/api-config';

export function loginUser(data: object) {
  let inputRequest = data.payload

  return request({ method: 'get', data: inputRequest });

}

export function verifyUserService(data: object) {
  let inputRequest = data.payload

  return request({ method: 'post', data: inputRequest });

}


///send mobile number to server for call otp
export function callOtpService(data: object) {
  let inputRequest = data.payload
  return request({ method: 'post', data: inputRequest });
}

//for get request
const onError = function (error: any) {
  if (error.response == undefined) {
    return {
      statusCode: 401,
      status: 401,
    };
  }
  return error.response;
};
export const getVersion  = async(data:any,payload:any) => {  
  try {
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action 
   // console.log("url--------------",url ,token)
    const response = await axios({
      method: "GET",
      url: url
    });
    console.log("123--", response)
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return onError(error);
  }  
}

