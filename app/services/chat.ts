import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  console.log('call services ', options.data);
  let tempOptions = JSON.stringify(options.data.formData); //getDataForClient(options);

  let headers: any;

  let token = await AsyncStorage.getItem('token');
  let URL =
   appConfig.BASE_URL +
    options.data.module +
    '/' +
    options.data.action;
  
    let client: any = {
      method: options.method,
      baseURL: URL,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

  if (options.method == 'get') client.params = options.data.formData;
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
export function getChatRequest(data: object) {
  let inputRequest = data.payload;
  return request({ method: 'get', data: inputRequest });
}

//for post request
export function postChatRequest(data: object) {
  let inputRequest = data.payload;
  return request({ method: 'post', data: inputRequest, isFormData: true });
}

//for post Media request
export const chatMediaRequest  = async(data,updateProgress) => {  
  let token = await AsyncStorage.getItem('token');

  let client: any = {
    method: "post",
    timeout: 50000, // Wait for 5 seconds
    url: appConfig.BASE_URL + 'chat/media',
    data: data,
    onUploadProgress: progressEvent => {
      let percentComplete = (progressEvent.loaded / progressEvent.total) * 100
      percentComplete = parseInt(percentComplete);
      console.log(percentComplete);
      updateProgress(percentComplete);
    },
    headers: {
      "Authorization": 'Bearer ' + token,
      "Accept": "application/json",
      //"Content-Type": "multipart/form-data",
    },
    // transformRequest: (data, error) => {
    //   return data;
    // },
  };

  return axios(client)
  .then(function (response) {
    console.log(response.data, 'inresponse');
    return response?.data;
  })
  .catch(function (error) {
    console.log(error)
    return onError(error);
  });

  // const response = await axios({
  //   method: "POST",
  //   url: `http://ec2-13-233-194-252.ap-south-1.compute.amazonaws.com:8000/api/v1/chat/media`,
  //   data: data,
  //   timeout: 60000, // Wait for 5 seconds
  //   onUploadProgress: progressEvent => {
  //     let percentComplete = (progressEvent.loaded / progressEvent.total) * 100
  //     percentComplete = parseInt(percentComplete);
  //     console.log(percentComplete);
  //     //updateProgress(percentComplete);
  //   },
  //   headers: {
  //     "Authorization": 'Bearer ' + token,
  //     "Accept": "application/json",
  //     "Content-Type": "multipart/form-data",
  //   },
  //   transformRequest: (data, error) => {
  //     return data;
  //   },
  // });
  // console.log("upload response",response)
  // return response?.data;
}


let source;
export const searchUserRequest  = async(data:any) => {  
if (source !== undefined) {
  source.cancel("Operation canceled due to new request.")
  }
  let token = await AsyncStorage.getItem('token');
  source = axios.CancelToken.source();
  let url = appConfig.BASE_URL + 'user_follow/search_suggest_user'
  try {
    const response = await axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json",
      }
    });
    //const response = await axios.get(url, { cancelToken: source.token, headers: { Authorization: 'Bearer ' + token } });
    console.log(response);
    return response;
  } catch (error) {
    if(axios.isCancel(error)){
      console.log('Data fetching cancelled');
    }else{
      console.log(error)
     return onError(error);
    }
    return null;
  }  
}

//for get request
export const sendChatGetRequest  = async(data:any,payload:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const u = new URLSearchParams(data).toString();
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action + "?" + u
   // console.log("url--------------",url ,token)
    const response = await axios({
      method: "GET",
      url: url,
     // data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log("123--", response)
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return onError(error);
  }  
}

//for post request
export const sendChatPostPutRequest  = async(data:any,payload:any,method:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action
    console.log("url--------------",url ,token,data,payload)
    const response = await axios({
      method: method,
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
export const sendChatPostFormRequest  = async(data:any,payload:any,method:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const url = appConfig.BASE_URL + payload?.module + "/" + payload?.action
    //console.log("url--------------",url ,token)
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return onError(error);
  }  
}