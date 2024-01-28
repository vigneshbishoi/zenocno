import actionTypes from '../actions/types';
import { all, takeEvery } from 'redux-saga/effects';
import { callOtp, verifyUserSaga, userDetailSaga, referralCodeSaga } from './loginSaga';
import {
  callOtpService,
  verifyUserService,
} from '../../services/loginUser';
import { getRequest, postRequest, putRequest } from '../../services/stories';
import {
  callUserDetailsSaga,
  callSearchCancerAllSaga,
  callSearchCityAllSaga,
  callSearchCancerSaga,
  callSearchCitySaga,
  callTreatmentSaga,
  callActivitySaga,
  callCuisineSaga,
  callCountrySaga,
  callCancerStageSaga,
  callSymptomsSaga,
  callFactorsSaga,
  callMedicalIssuesSaga,
  callMedicationSaga,
  callPaymentSaga,
  callPaymentPlansSaga,
  callFetchDetailsSaga,
  callGetAllDetailSaga,
  callEditUserDetailsSaga,
  fetchTreatmentSaga,
  callPaymentVerificationSaga,
  getOnboardDataSaga
} from './onboardingSaga';
import {
  getWellnessCategorySaga,
  getWellnessCategoryByIDSaga,
  pinListSaga,
  followListSaga,
  markAsSpamListSaga,
  ReportListSaga,
} from './storiesSaga';
import {
  getAllCancer,
  getAllCity,
  getCancer,
  getCity,
  addUserDetails,
  onboarding,
  payment,
  editUserDetails
} from '../../services/onboarding';
import { deletePatientSaga, fetchPatientSaga, invitedPatientsSaga, patientReferalSaga, postPatientSaga } from './patientSaga'
import { bookAppointmentSaga, cancelAppointmentSaga, cancelOptionsSaga, docotorCategorySaga, docotorReviewSaga, getDocotorDetail, getDocotorList, getDocotorSchedule, getDocotorSearchList, getMyAppointment, rescheduleAppointmentSaga, writeReviewSaga, saveDoctorSaga, getPatientDetailSaga } from './appointmentSaga';


export const saga1 = [
  takeEvery(actionTypes.CALL_OTP, callOtp, callOtpService),
  takeEvery(actionTypes.REFERRAL_CODE, referralCodeSaga, postRequest),
  takeEvery(actionTypes.V_USER, verifyUserSaga, verifyUserService),
  takeEvery(actionTypes.POST_PIN_STORY, pinListSaga, postRequest),
  takeEvery(actionTypes.POST_FOLLOWLIST_STORY, followListSaga, postRequest),
  takeEvery(actionTypes.POST_REPORT_LIST_STORY, ReportListSaga, postRequest),
  takeEvery(actionTypes.POST_MARK_AS_SPAM_STORY, markAsSpamListSaga, postRequest),
  takeEvery(actionTypes.FETCH_USER_DETAILS, userDetailSaga, getRequest),
  takeEvery(actionTypes.CANCER_SEARCH_ALL, callSearchCancerAllSaga, getAllCancer),
  takeEvery(actionTypes.CANCER_SEARCH, callSearchCancerSaga, getCancer),
  takeEvery(actionTypes.GET_TREATMENT, callTreatmentSaga, onboarding),
  takeEvery(actionTypes.TREATMENT_DATA, fetchTreatmentSaga, onboarding),
  takeEvery(actionTypes.CITY_SEARCH_ALL, callSearchCityAllSaga, getAllCity),
  takeEvery(actionTypes.CITY_SEARCH, callSearchCitySaga, getCity),
  takeEvery(actionTypes.ADD_USER_DETAILS, callUserDetailsSaga, addUserDetails,),
  takeEvery(actionTypes.EDIT_USER_DETAILS, callEditUserDetailsSaga, editUserDetails,),
  takeEvery(actionTypes.GET_ALL_USERPROFILE, callGetAllDetailSaga, onboarding,),
  takeEvery(actionTypes.GET_ALL_WELLNESS_CATEGORY, getWellnessCategorySaga, onboarding,),
  takeEvery(actionTypes.GET_ALL_WELLNESS_CATEGORY_BYID, getWellnessCategoryByIDSaga, onboarding,),
  takeEvery(actionTypes.GET_PHYSICAL_ACTIVITY, callActivitySaga, onboarding),
  takeEvery(actionTypes.GET_CUISINE, callCuisineSaga, onboarding),
  takeEvery(actionTypes.GET_COUNTRY, callCountrySaga, onboarding),
  takeEvery(actionTypes.GET_CANCER_STAGE, callCancerStageSaga, onboarding),
  takeEvery(actionTypes.GET_SYMPTOMS, callSymptomsSaga, onboarding),
  takeEvery(actionTypes.GET_FACTORS, callFactorsSaga, onboarding),
  takeEvery(actionTypes.GET_MEDICAL_ISSUES, callMedicalIssuesSaga, onboarding,),
  takeEvery(actionTypes.GET_MEDICATIONS, callMedicationSaga, onboarding),
  takeEvery(actionTypes.GET_PAYMENT, callPaymentSaga, payment),
  takeEvery(actionTypes.GET_PAYMENT_PLANS, callPaymentPlansSaga, onboarding),
  takeEvery(actionTypes.FETCH_USER_DETAILS, callFetchDetailsSaga, onboarding),
  takeEvery(actionTypes.GET_PAYMENT_VERFIY, callPaymentVerificationSaga, payment),
  takeEvery(actionTypes.FETCH_PATIENT, fetchPatientSaga, getRequest),
  takeEvery(actionTypes.POST_PATIENT, postPatientSaga, postRequest),
  takeEvery(actionTypes.PATIENT_REFERAL, patientReferalSaga, getRequest),
  takeEvery(actionTypes.INVITED_PATIENT, invitedPatientsSaga, getRequest),
  takeEvery(actionTypes.DELETE_PATIENT, deletePatientSaga, putRequest),
  takeEvery(actionTypes.FETCH_APPOINTMENT, getMyAppointment, getRequest),
  takeEvery(actionTypes.FETCH_DOCTORS, getDocotorList, getRequest),
  takeEvery(actionTypes.FETCH_DOCTORS_SEARCH, getDocotorSearchList, getRequest),
  takeEvery(actionTypes.DOCTOR_SCHEDULE, getDocotorSchedule, getRequest),
  takeEvery(actionTypes.DOCTOR_DETAIL, getDocotorDetail, getRequest),
  takeEvery(actionTypes.BOOK_APPOINTMENT, bookAppointmentSaga, postRequest),
  takeEvery(actionTypes.CANCEL_APPOINTMENT, cancelAppointmentSaga, postRequest),
  takeEvery(actionTypes.RESCHEDULE_APPOINTMENT, rescheduleAppointmentSaga, putRequest),
  takeEvery(actionTypes.DOCTOR_CATEGORY, docotorCategorySaga, getRequest),
  takeEvery(actionTypes.DOCTOR_REVIEW, docotorReviewSaga, getRequest),
  takeEvery(actionTypes.WRITE_REVIEW, writeReviewSaga, postRequest),
  takeEvery(actionTypes.CANCEL_OPTIONS, cancelOptionsSaga, getRequest),
  takeEvery(actionTypes.GET_PATIENT_DETAIL, getPatientDetailSaga, getRequest),
  takeEvery(actionTypes.GET_ONBOARD, getOnboardDataSaga, getRequest),
  takeEvery(actionTypes.SAVE_DOCTORS, saveDoctorSaga, postRequest)
]

