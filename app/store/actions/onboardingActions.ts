/*
 *Reduces Actions related to user onboarding 
 */

import actionTypes from "./types";
import { ISearchResponse } from "../../models/api/onboarding";
import { ObjectTypeAnnotation } from "@babel/types";
export function loader(index: string, data: boolean, type: string) {
    return {
        type: type,
        index,
        data,
    };
}

//getall api call for cancertypes

export function callSearchCancerAll(type: string, payload: any) {

    return {
        type,
        payload
    }
}

//data call for cancertypes all
export function callSearchCancerAllData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//getall api call for cancertypes based on query
export function callSearchCancer(type: string, payload: any) {

    return {
        type,
        payload
    }
}

//data call for cancertypes based on query
export function callSearchCancerData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}



//getall api call for cities
export function callSearchCitiesAll(type: string, payload: any) {
    console.log(type, "type")
    console.log(payload, "from actions")
    return {
        type,
        payload
    }
}
//data call api for cities all
export function callSearchCitiesAllData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//getall api call for Medical Treatment
export function callMedTreatmentAll(type: string, payload: any) {
    console.log(type, "type")
    console.log(payload, "from actions")
    return {
        type,
        payload
    }
}
//data call api for Medical Treatment all
export function callMedTreatmentAllData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//call api call for createPost
export function createPost(type: string, payload: any) {
    console.log(type, "type")
    console.log(payload, "from actions")
    return {
        type,
        payload
    }
}
//data call api for createPost Data
export function createPostData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//getall api call for Cam Treatment
export function callCamTreatmentAll(type: string, payload: any) {
    console.log(type, "type")
    console.log(payload, "from actions")
    return {
        type,
        payload
    }
}
//data call api for Can Treatment all
export function callCamTreatmentAllData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//getall api call for Health Status
export function callHealthStatusAll(type: string, payload: any) {
    console.log(type, "type")
    console.log(payload, "from actions")
    return {
        type,
        payload
    }
}
//data call api for Health Status all
export function callHealthStatusAllData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//getall api call forcitiess based on query
export function callSearchCities(type: string, payload: any) {

    return {
        type,
        payload
    }
}

//data call forcities based on query
export function callSearchCitiesData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}



//for sending user onboarding details to the server
//for calling user details
export function callUserDetails(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for userDetails data
export function callUserDetailsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for calling user details
export function callEditUserDetails(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for userDetails data
export function callEditUserDetailsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for calling get ALL user details
export function callGetAllDetail(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for get ALL userDetails data
export function callGetAllDetailData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for calling cancer stage api
export function callCancerStage(type: string, payload: any) {

    return {
        type,
        payload
    }
}

//for data for cancer stage
export function callCancerStageData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for calling cuisin api
export function callCuisine(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for data for cuisine api
export function callCuisinData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
// //for physical acitivity
export function callAcivity(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
// export function callAcivity(type: string, payload: any) {
//     return (dispatch: any) => {
//         return new Promise((resolve, reject) => {
//             dispatch({
//                 type: type,
//                 payload,
//                 resolve,
//                 reject
//             })
//         });
//     }
// }

//for physical activity data
export function callActivityData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for physical country
export function callCountry(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

//for physical activity data
export function callCountryData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for treatment
export function callTreatment(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

//for treatment data
export function callTreatmentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//symptoms
export function callSymptoms(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for symptoms data
export function callSymptomsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for factors
export function callFactors(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

//for factors data
export function callFactorsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for medication 
export function callMedication(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

//for medication data
export function callMedicationData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for medication issues
export function callMedicalIssues(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

//for medication issues data
export function callMedicalIssuesData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

// //for payment call
// export function callPayment(type: string, payload: any) {
//     return {
//         type,
//         payload,
//     }
// }

// //for payment data
export function callPaymentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

export function callPayment(type: string, payload: any) {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: type,
                payload,
                resolve,
                reject
            })
        });
    }
}

//for payment plans
export function callPaymentPlans(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

//for payment data
export function callPaymentPlansData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for verify payment
export function callVerifyPayment(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for verify payment data
export function callVerifyPaymentData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//fetch UserDetails

// export function callFetchDetails(type: string, payload: any) {
//     return {
//         type,
//         payload
//     }
// }
export function callFetchDetails(type: string, payload: any) {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: type,
                payload,
                resolve,
                reject
            })
        });
    }
}

//fetch data for user datails
export function callFetchDetailsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for edit image
export function editImage(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//for verify payment data
export function editImageData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for other user profile
export function otherUserProfile(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function otherUserProfileData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for fetch treatments
export function treatmentData(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function treatmentDataAll(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for fetch treatments
export function getOnboard(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function getOnboardData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}