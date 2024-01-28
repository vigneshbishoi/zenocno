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
    console.log('call services ');
    var tempOptions = JSON.stringify(options.data.formData); //getDataForClient(options);
  
    var headers: any;
    
    //var token = await AsyncStorage.getItem('token');
//https://clinicaltrials.gov/ct2/rpc/extend/cond?cond=cancer
    let URL =
      'https://clinicaltrials.gov/ct2/rpc/' +
      options.data.module +
      '/' +
      options.data.action;
    var client: any = {
      method: options.method,
      baseURL: URL,
      headers: {
        //'Authorization': basicAuth,
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
export function getClinicalRequest(data: object) {
    let inputRequest = data.payload;
    return request({method: 'get', data: inputRequest});
  }

  //for post request
export function postClinicalRequest(data: object) {
  let inputRequest = data.payload;
  return request({method: 'post', data: inputRequest});
}

//for search request
// export const searchRequest  = async(data) => {
//   const source = axios.CancelToken.source();
//   let url = `https://clinicaltrials.gov/ct2/rpc/extend/cond?cond=` + data
//   console.log("url--------",url)
//   try {
//     const response = await axios.get(url, { cancelToken: source.token });
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     if(axios.isCancel(error)){
//       console.log('Data fetching cancelled');
//     }else{
//      // Handle error
//     }
//     return null;
//   }
// }

let source;
export const searchRequest  = async(data:any) => {  
if (source !== undefined) {
  source.cancel("Operation canceled due to new request.")
}
source = axios.CancelToken.source();
  let url = `https://clinicaltrials.gov/ct2/rpc/extend/cond?cond=` + data
  //console.log("url--------",url)
  try {
    const response = await axios.get(url, { cancelToken: source.token });
    console.log(response.data);
    return response;
  } catch (error) {
    if(axios.isCancel(error)){
      console.log('Data fetching cancelled');
    }else{
      return onError(error);
    }
    return null;
  }  
}

//for save request
export const saveClinicalRequest  = async(data:any) => {  
  let token = await AsyncStorage.getItem('token');
  try {
    const response = await axios({
      method: "POST",
      url: appConfig.BASE_URL + '/clinical_trail/create',
      data: data,
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return response.status;
  } catch (error) {
    console.log("error" ,error , token ,data);
    return onError(error);
  }  
}
  