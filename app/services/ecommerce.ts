import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encode as btoa} from 'base-64'
import appConfig from '../../app/config/api-config';


  const request = async (options: any) => {
    var req = new Promise((resolve, reject) => {
      callService(options).then(response => {
        resolve(response);
      });
    });
    return req;
  };
  const onError = function (error: any) {
    if (error.response == undefined) {
      return {
        statusCode: 401,
        status: 401,
      };
    }
    return error.response;
  };

  const callService = async function (options: any) {
    console.log('call services ');
    var tempOptions = JSON.stringify(options.data.formData); //getDataForClient(options);
  
    var headers: any;
    
    var token = await AsyncStorage.getItem('token');

    let URL =
      'https://zenonco.io/cancer/wp-json/wc/v3/' +
      options.data.module +
      '/' +
      options.data.action;
      var username = 'ck_de0efc9cca4395dffba3ee7f6daa5e806c88afc4';
      var password = 'cs_aa14388c264a2b243add983f1c27d8c6354ce182';
      var basicAuth = 'Basic ' + btoa(username + ':' + password);
    var client: any = {
      method: options.method,
      baseURL: URL,
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
      },
    };
  
    if (options.method == 'get') client.params = options.data.formData;
    else if (options.method == 'delete') client.data = options.data.formData;
    else client.data = tempOptions;
    if (options.isFormData) client.data = options.data.formData;
    console.log(client, 'client');
  
    return axios(client)
      .then(function (response) {
        console.log(response.data, 'inresponse');
        return response;
      })
      .catch(function (error) {
        console.log(error, 'Error');
        return onError(error);
      });
  };


//for get request
export function getEcommerceRequest(data: object) {
    let inputRequest = data.payload;
    return request({method: 'get', data: inputRequest});
  }

  //for post request
export function postEcommerceRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'post', data: inputRequest});
}
  
//for save request
export const savePostRequest  = async(data:any,payload:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
          // url: `http://ec2-13-233-194-252.ap-south-1.compute.amazonaws.com:8000/api/v1/product_item/add-product-review`,
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action
  console.log("data-------",url , data)
    const response = await axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return onError(error);
  }  
}

//for post request
export const sendGetRequest  = async(data,payload) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const u = new URLSearchParams(data).toString();
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action + "?" + u
    console.log("url--------------",url)
    const response = await axios({
      method: "GET",
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
    return onError(error);
  }  
}