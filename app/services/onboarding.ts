import request from "./client";


//for getatll cancer
export function getAllCancer(data: object) {
    console.log("fromservice")
    let inputRequest = data.payload
    return request({ method: 'get', data: inputRequest })
}
//for search cancer
export function getCancer(data: object) {
    console.log("from caner")
    let inputRequest = data.payload
    return request({ method: "get", data: inputRequest })
}

//for getall city
export function getAllCity(data: object) {
    console.log("from city service")
    let inputRequest = data.payload
    return request({ method: "get", data: inputRequest })
}

//for search city
export function getCity(data: object) {
    console.log("from city")
    let inputRequest = data.payload
    return request({ method: "get", data: inputRequest })
}

//for userdetails
export function addUserDetails(data: object) {
    console.log("from userdetails saga")
    let inputRequest = data.payload
    return request({ method: "post", data: inputRequest })
}

//for userdetails
export function editUserDetails(data: object) {
    console.log("from userdetails saga")
    let inputRequest = data.payload
    return request({ method: "put", data: inputRequest })
}

//for all onboarding
export function onboarding(data: object) {
    let inputRequest = data.payload
    return request({ method: "get", data: inputRequest })
}


//for payment
export function payment(data: object) {
    let inputRequest = data.payload
    return request({ method: "post", data: inputRequest })
}