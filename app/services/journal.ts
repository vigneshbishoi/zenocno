import ApiConfig from '../config/api-config';
import request from '../services/client';

//for get request
export function getJournalRequest(data: object) {
  let inputRequest = data.payload;
  return request({ method: 'get', data: inputRequest });
}

