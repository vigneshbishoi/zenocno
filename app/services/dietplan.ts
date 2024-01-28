import request from "./client";

//for get request
export function getRequest(data: object) {

    let inputRequest = data.payload
    return request({ method: 'get', data: inputRequest })
}

//for post request
export function postRequest(data: object) {
    let inputRequest = data.payload
    return request({ method: 'post', data: inputRequest })
}