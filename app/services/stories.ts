import request from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../../app/config/api-config';
import axios from 'axios';

//for get request
export function getRequest(data: object) {
  let inputRequest = data.payload;
  console.log("get request" , inputRequest)
  return request({method: 'get', data: inputRequest});
}

//for post request
export function postRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'post', data: inputRequest});
}

//for Delete request
export function deleteRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'delete', data: inputRequest});
}

export function postFormDataRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'post', data: inputRequest, isFormData: true});
}

export function putRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'put', data: inputRequest, isFormData: true});
}

export const getAllStories  = async(data:any,payload:any,method:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const u = new URLSearchParams(data).toString();
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action + "?" + u
    console.log("url--------------",url ,token,data,payload)
    const response = await axios({
      method: method,
      url: url,
      // data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return error;
  }  
}

export const getSuccessImages  = async(data:any,payload:any,method:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action 
    console.log("url--------------",url ,token,data,payload)
    const response = await axios({
      method: method,
      url: url,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return error;
  }  
}

