/** javascript comment
 * @Author: Anand R
 * @Date: 2021-11-15 11:23:59
 * @Desc: External call via axios
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import appCFG from 'react-native-config';
import axios from 'axios';
import appConfig from '../../app/config/api-config';

// var CryptoJSAesJson = { stringify: function (r) { var t = { ct: r.ciphertext.toString(CryptoJS.enc.Base64) }; return r.iv && (t.iv = r.iv.toString()), r.salt && (t.s = r.salt.toString()), JSON.stringify(t) }, parse: function (r) { var t = JSON.parse(r), e = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(t.ct) }); return t.iv && (e.iv = CryptoJS.enc.Hex.parse(t.iv)), t.s && (e.salt = CryptoJS.enc.Hex.parse(t.s)), e } };

const uploadModules = ['fetchReceipt', 'uploadReadFile', 'uploadMasterData'];

/**
 * @desc: Function which gets encrypted data and gives decrypted data
 * @param {* encrypted response from api} response
 * @returns decrypted response to request method
 */
const onSuccess = async function (response: any) {
  // let data = response.data
  return response;
};

/**
 * @desc: To handle the error from api
 * @param {* error} error
 * @returns error
 */
const onError = function (error: any) {
  if (error.response == undefined) {
    return {
      statusCode: 401,
      status: 401,
    };
  }
  return error.response;
};

/**
 * @desc: This function decrypts the encrypted data
 * @param {* encrypted response from api} response
 * @returns decrypted response to onSuccess method
 */
// const _decryptData = async (response: any) => {
//   if (typeof response != 'object' && !response.includes('Error') && (typeof response == 'string' && response.trim().length > 0)) {
//     response = JSON.parse(CryptoJS.AES.decrypt(base64.decode(response), appCFG.DECRYPTION_KEY, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8))
//     return response;
//   }
// }

/**
 * @desc: This function is called from service to handle the api call
 * @param {* options from service file} options
 * @returns final response to saga
 */
const request = async (options: any) => {
  var req = new Promise((resolve, reject) => {
    callService(options).then(response => {
      resolve(response);
    });
  });
  return req;
};

/**
 * @desc: To make an encrypted request
 * @param {* options from service file} options
 * @returns encrypted request
 */
// const getDataForClient = (options: any) => {
//   var tempOptions = JSON.parse(JSON.stringify(options));
//   let cipherText = base64.encode(CryptoJS.AES.encrypt(JSON.stringify(options.data), appCFG.ENCRYPTION_KEY, { format: CryptoJSAesJson }).toString());
//   tempOptions.data = JSON.stringify(cipherText);
//   return tempOptions;
// }

/**
 * @param {* options from service file} options
 * @returns client promise
 */
const callService = async function (options: any) {
  console.log('call services ',options.method);
  var tempOptions = JSON.stringify(options.data.formData); //getDataForClient(options);

  var headers: any;
  // if (uploadModules.includes(options.data.action)) {
  //   let data = {};
  //   data = options.data.formData;
  //   headers = {
  var token = await AsyncStorage.getItem('token');
  // var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzODc2MjU0OX0.k-bs_Kp2Mu-c4WfR18Qfj6jN1UIkAJxQUUWBSElQKB0"
  //     Authorization: 'Basic ' + base64.encode(appCFG.USERNAME + ':' + appCFG.PWD)
  //   };

  // } else if (options.data.module === 'JWT') {
  //   headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: 'Basic ' + base64.encode(appCFG.USERNAME + ':' + appCFG.PWD)
  //   };
  // }
  let URL =
  appConfig.BASE_URL +
    options.data.module +
    '/' +
    options.data.action;
  // let URL =
  //   'https://zenapp.zenonco.io/api/v1/' +
  //   options.data.module +
  //   '/' +
  //   options.data.action;
  
  // console.log('TOKEN -->', token);
  

  var client: any = {
    method: options.method,
    baseURL: URL,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }, //headers
    // data: tempOptions
  };

  if (options.method == 'get') client.params = options.data.formData;
  else if (options.method == 'delete') client.data = options.data.formData;
  else client.data = tempOptions;
  if (options.isFormData) client.data = options.data.formData;
  if (options?.data?.isModules) client.baseURL = appConfig.BASE_URL +
    options.data.module;
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

export default request;
