import * as onboardingAction from "../actions/onboardingActions"
import * as loginActions from "../actions/loginActions"
import actionTypes from "../actions/types"
import { put, call } from "redux-saga/effects"
import { onboardingReducer } from "../reducers/onboardingReducer"
import Toast from 'react-native-toast-message';

//for getall cancer
export function* callSearchCancerAllSaga(service: any, payload: object): any {
    try {
        console.log("from saga")
        const response = yield call(service, payload)
        yield put(onboardingAction.callSearchCancerAllData("cancerAllData", response.data, actionTypes.CANCER_SEARCH_ALL_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    } catch (e: any) {
        console.log("error", e.message)
    }
}
//for search cancer
export function* callSearchCancerSaga(service: any, payload: object): any {
    try {
        console.log("from saga")
        const response = yield call(service, payload)
        yield put(onboardingAction.callSearchCancerData("cancerData", response.data, actionTypes.CANCER_SEARCH_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    } catch (e: any) {
        console.log("error", e.message)
    }
}
//for getall city
export function* callSearchCityAllSaga(service: any, payload: object): any {
    try {
        console.log("from city saga")
        const reponse = yield call(service, payload)
        yield put(onboardingAction.callSearchCitiesAllData("cityAllData", reponse.data, actionTypes.CITY_SEARCH_ALL_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    } catch (e: any) {
        console.log("error", e.message)
    }
}
//for search city
export function* callSearchCitySaga(service: any, payload: object): any {
    try {
        console.log("from city saga")
        const response = yield call(service, payload)
        yield put(onboardingAction.callSearchCitiesData("cityData", response.data, actionTypes.CITY_SEARCH_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    } catch (e: any) {
        console.log("error", e.message)
    }
}


//for post userdetails data
export function* callUserDetailsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callUserDetailsData("userDetails", response.data, actionTypes.ADD_USER_DETAILS_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for post EDIT userdetails data
export function* callEditUserDetailsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        if(response?.data && response?.data?.status == 1){
            if(response?.data?.is_updated == 1){
                yield put(onboardingAction.callEditUserDetailsData("userDetails", response.data, actionTypes.EDIT_USER_DETAILS_DATA))
                yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
              });
        }
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get userProfile data
export function* callGetAllDetailSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callGetAllDetailData("getAllProfile", response.data, actionTypes.GET_ALL_USERPROFILE_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get physical activity
export function* callActivitySaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        // const data = response.data.data.map(item=>{return{...item,selected:false}})
        yield put(onboardingAction.callActivityData("activityData", response.data, actionTypes.GET_PHYSICAL_ACTIVITY_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))


    } catch (e: any) {
        console.log("error", e.message)
    }
}

//for get cuisine
export function* callCuisineSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callCuisinData("cuisineData", response.data, actionTypes.GET_CUISINE_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.mssage)
    }
}

//for country
export function* callCountrySaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callCountryData("countryData", response.data, actionTypes.GET_COUNTRY_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
//for cancer stage
export function* callCancerStageSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callCancerStageData("cancerStageData", response.data, actionTypes.GET_CANCER_STAGE_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//fot treatment
export function* callTreatmentSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callTreatmentData("treatmentData", response.data, actionTypes.GET_TREATMENT_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for symptoms
export function* callSymptomsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callSymptomsData("symptomsData", response.data, actionTypes.GET_SYMPTOMS_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
//for factors
export function* callFactorsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callFactorsData("factorsData", response.data, actionTypes.GET_FACTORS_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for medical issues
export function* callMedicalIssuesSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callMedicalIssuesData('medicalIssuesData', response.data, actionTypes.GET_MEDICAL_ISSUES_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
//for medication
export function* callMedicationSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callMedicationData('medicationData', response.data, actionTypes.GET_MEDICATIONS_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for payment
export function* callPaymentSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callPaymentData("paymentData", response.data, actionTypes.GET_PAYMENT_DATA))
        payload.resolve(response.data);
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for payment plans
export function* callPaymentPlansSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callPaymentPlansData("paymentPlansData", response.data, actionTypes.GET_PAYMENT_PLANS_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))

    }
    catch (e: any) {
        console.log("eror", e.message)
    }
}

//for payment verification 
export function* callPaymentVerificationSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callVerifyPaymentData("payVerifyData", response.data, actionTypes.GET_PAYMENT_VERIFY_DATA))
        yield put(onboardingAction.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching user details
export function* callFetchDetailsSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callFetchDetailsData("userDetails", response.data, actionTypes.FETCH_USER_DETAILS_DATA))
        // yield put(loginActions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS));
        payload.resolve(response.data);

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching MEDICAL Treatments
export function* callFetchMedicalTreatmentsSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callMedTreatmentAllData("medicalTreatment", response.data, actionTypes.MED_TREATMENT_ALL_DATA))
        // yield put(loginActions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS));
        payload.resolve(response.data);

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for createPost API
export function* callCreatePostSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload);
        yield put(
            onboardingAction.createPostData(
            'createPost',
            response.data,
            actionTypes.CREATE_POST_DATA,
          ),
        );
      } catch (e: any) {
        console.log('error CREATE_POST_DATA', e.message);
      }
}

//for fetching CAM Treatments
export function* callFetchCamTreatmentsSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callCamTreatmentAllData("camTreatment", response.data, actionTypes.CAM_TREATMENT_ALL_DATA))
        // yield put(loginActions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS));
        payload.resolve(response.data);

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching Health Status
export function* callFetchHealthStatusSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.callHealthStatusAllData("healthStatuses", response.data, actionTypes.HEALTH_STATUS_ALL_DATA))
        // yield put(loginActions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS));
        payload.resolve(response.data);

    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching Health Status
export function* callEditImageSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.editImageData("profileImage", response.data, actionTypes.EDIT_IMAGE_DATA))
        payload.resolve(response.data);
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching Other User Detail
export function* callOtherProfileSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.otherUserProfileData("userDetailsData", response.data, actionTypes.FETCH_OTHER_DETAIL_DATA))
        payload.resolve(response.data);
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching All Treatments
export function* fetchTreatmentSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.treatmentDataAll("treatmentData", response.data, actionTypes.TREATMENT_DATA_ALL))
        payload.resolve(response.data);
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for fetching All OnboardData
export function* getOnboardDataSaga(service: any, payload: any): any {
    try {
        const response = yield call(service, payload)
        yield put(onboardingAction.getOnboardData("onboardData", response.data, actionTypes.GET_ONBOARD_DATA))
        payload.resolve(response.data);
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

