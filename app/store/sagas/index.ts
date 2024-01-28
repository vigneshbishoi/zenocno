import actionTypes from '../actions/types';

/**
 *  Redux saga class init
 */
import { ActionPattern, all, takeEvery, takeLatest, fork } from 'redux-saga/effects';

import { loginAsync, callOtp, verifyUserSaga, userDetailSaga, referralCodeSaga } from './loginSaga';
import {
  loginUser,
  callOtpService,
  verifyUserService,
} from '../../services/loginUser';
import { getRequest, postRequest, postFormDataRequest, deleteRequest, putRequest } from '../../services/stories';
import { getEcommerceRequest, postEcommerceRequest } from '../../services/ecommerce';
import { getClinicalRequest, postClinicalRequest } from '../../services/clinicalTrials';
import { getChatRequest, postChatRequest } from '../../services/chat';

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
  callPaymentVerificationSaga,
  callFetchDetailsSaga,
  callGetAllDetailSaga,
  callEditUserDetailsSaga,
  callFetchCamTreatmentsSaga,
  callFetchHealthStatusSaga,
  callFetchMedicalTreatmentsSaga,
  callCreatePostSaga,
  callEditImageSaga,
  callOtherProfileSaga,
  fetchTreatmentSaga
} from './onboardingSaga';

import {
  getAllStoriesSaga,
  getStoriesByUserIdSaga,
  addCommentsSaga,
  getCommentsByIdSaga,
  getStoriesByIdSaga,
  addSupportSaga,
  getDiscoverSaga,
  getRecentStoriesSaga,
  updateBookmarkSage,
  getMenuListDataSaga,
  getDetailMenuItemSaga,
  getFaqListDataSaga,
  getWellnessCategorySaga,
  getWellnessCategoryByIDSaga,
  getCommunityListDataSaga,
  addSummarySaga,
  getCommunityGroupListDataSaga,
  getCommunityCategoryListDataSaga,
  getCommunityByIdListDataSaga,
  getCommunityDetailDataSaga,
  getCommunityGroupDetailDataSaga,
  joinGroupSaga,
  pinGroupSaga,
  getGroupMemberDataSaga,
  getGroupPostDataSaga,
  postFilterDataSaga,
  pinListSaga,
  followListSaga,
  markAsSpamListSaga,
  ReportListSaga,
  getRulesSaga,
  profilePostDataSaga,
  getTagDataSaga,
  followUserSaga,
  leaveGroupSaga,
  editCommentSaga,
  deleteCommentSaga,
  callGroupSearchData,
  allWllnessSaga,
  deletePostSaga,
  userReportSaga,
  myBookmarkSaga,
  getPostCategorySaga
} from './storiesSaga';

import {
  getReferralCodeSaga,
  getReferralCoinSaga
} from './referralSaga'

import {
  getJournalSaga, getSymptomsSaga
} from './journalSaga'

import {
  getDietPlanSaga,
  createDietPlanSaga,
  getCuisinesSaga,
  getDietPreferenceSaga,
  postAllergiesFoodsSaga,
  postCuisineFoodsSaga,
  postDietPreferenceSaga,
  getDietFoodInfoSaga,
  getSimilarFoodSaga,
  getFoodItemBfSaga,
  setTrackFoodSaga,
  changeRandomFoodSaga,
  getFoodItemLuSaga,
  getFoodItemSnSaga,
  searchFoodItemSaga,
  submitFoodItemSaga,
  checkFlowSaga,
  likeFoodSaga,
  getIngredientsSaga
} from './dietPlanSaga';
import {
  getProductCategories,
  getProducts,
  getCategoryProducts,
  getProductDetail,
  createOrderSaga,
  createCustomerSaga,
  createCustomerServerSaga,
  fetchCustomerSaga,
  editCustomerSaga,
  createOrderServerSaga,
  getProductImagesSaga,
  createCartSaga,
  getCartSaga,
  updateCartSaga,
  deleteCartSaga,
  getAddressSaga,
  createAddressSaga,
  clearUserCartSaga,
  getProductReviewSaga
} from './ecommerceSage';
import {
  getCalendarSuggestionSaga,
  getCalendarSaga,
  addCalendarSaga,
  calendarCategorySaga,
  editCalendarSaga,
  creatStreakSaga,
  deleteActivitySaga
} from './calendarSaga';
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
import {
  getConditionSaga,
  saveConditionSaga,
} from './clinicalTrialsSaga';
import {
  getOncologistSaga,
  getOncologistFilterSaga,
  getOncologistDrSaga,
  getSpecializationSaga
} from './oncologistSaga';
import {
  deactivateAccountSaga,
  deleteAccountSaga,
  notificationToogleSaga
} from './settingSaga';

import { Action, AnyAction } from 'redux';
import { getJournalRequest } from '../../services/journal';
//import { uploadChatMedia } from '../actions/chatAction';
import { getChatConversationSaga, getCoachChatSaga } from './chatSaga';
import {
  getMyReportsSaga, getReportFilterSaga, getReportsCategorySaga
} from './myReportsSaga'
import { getLeaderboardSaga } from './leaderboardSaga';
import { getAllHomeSaga } from './homeSaga';
import { getProfileMatchSaga, getTreatmentSaga } from './profileMatchSaga';
import { getHomeSearchSaga } from './homeSearchSaga';
import { eventAllSaga, eventByCategorySaga, eventCategorySaga, financialResourceByIdSaga, financialResourcesSaga, registerEventSaga } from './eventSaga';
import { registerEvent } from '../actions/eventAction';
import {saga1} from './saga1'
import {saga2} from './saga2'
import {saga3} from './saga3'

export default function* watch() {
  yield all([
    ...saga1,
    ...saga2,
    ...saga3,
  ])
  // yield all([takeEvery(actionTypes.CALL_OTP, callOtp, callOtpService)]);
  // yield all([takeEvery(actionTypes.REFERRAL_CODE, referralCodeSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.V_USER, verifyUserSaga, verifyUserService)]);
  // yield all([takeEvery(actionTypes.POST_PIN_STORY, pinListSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.POST_FOLLOWLIST_STORY, followListSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.POST_REPORT_LIST_STORY, ReportListSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.POST_MARK_AS_SPAM_STORY, markAsSpamListSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.FETCH_USER_DETAILS, userDetailSaga, getRequest)]);
  // yield all([takeEvery(actionTypes.CANCER_SEARCH_ALL,callSearchCancerAllSaga,getAllCancer)]);
  // yield all([takeEvery(actionTypes.CANCER_SEARCH, callSearchCancerSaga, getCancer)]);
  // yield all([takeEvery(actionTypes.GET_TREATMENT, callTreatmentSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.TREATMENT_DATA, fetchTreatmentSaga, onboarding)]);
  // yield all([takeEvery(actionTypes.CITY_SEARCH_ALL, callSearchCityAllSaga, getAllCity),]);
  // yield all([takeEvery(actionTypes.CITY_SEARCH, callSearchCitySaga, getCity)]);
  // yield all([takeEvery(actionTypes.ADD_USER_DETAILS,callUserDetailsSaga,addUserDetails,),]);
  // yield all([takeEvery(actionTypes.EDIT_USER_DETAILS,callEditUserDetailsSaga,editUserDetails,),]);
  // yield all([takeEvery(actionTypes.GET_ALL_USERPROFILE,callGetAllDetailSaga,onboarding,),]);
  // yield all([takeEvery(actionTypes.GET_ALL_WELLNESS_CATEGORY,getWellnessCategorySaga,onboarding,),]);
  // yield all([takeEvery(actionTypes.GET_ALL_WELLNESS_CATEGORY_BYID,getWellnessCategoryByIDSaga,onboarding,),]);
  // yield all([takeEvery(actionTypes.GET_PHYSICAL_ACTIVITY, callActivitySaga, onboarding),]);
  // yield all([takeEvery(actionTypes.GET_CUISINE, callCuisineSaga, onboarding)]);
  // yield all([takeEvery(actionTypes.GET_COUNTRY, callCountrySaga, onboarding)]);
  // yield all([takeEvery(actionTypes.GET_CANCER_STAGE, callCancerStageSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.GET_SYMPTOMS, callSymptomsSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.GET_FACTORS, callFactorsSaga, onboarding)]);
  // yield all([takeEvery(actionTypes.GET_MEDICAL_ISSUES,callMedicalIssuesSaga,onboarding,),]);
  // yield all([takeEvery(actionTypes.GET_MEDICATIONS, callMedicationSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.GET_PAYMENT, callPaymentSaga, payment)]);
  // yield all([takeEvery(actionTypes.GET_PAYMENT_PLANS, callPaymentPlansSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.FETCH_USER_DETAILS, callFetchDetailsSaga, onboarding),]);
  // yield all([takeEvery(actionTypes.GET_STORIES_ALL, getAllStoriesSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_REFERRAL_CODE, getReferralCodeSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_REFERRAL_COIN, getReferralCoinSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_STORIES_BY_ID, getStoriesByIdSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_STORIES_BY_USER_ID,getStoriesByUserIdSaga,getRequest,),]);
  // yield all([takeEvery(actionTypes.ADD_COMMENTS, addCommentsSaga, postFormDataRequest),]);
  // yield all([takeEvery(actionTypes.GET_COMMENTS_BY_ID, getCommentsByIdSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.ADD_SUPPORT, addSupportSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.USER_REPORT, userReportSaga, postRequest)]);
  // yield all([takeEvery(actionTypes.UPDATE_BOOKMARK, updateBookmarkSage, postRequest),]);
  // yield all([takeEvery(actionTypes.GET_DISCOVER, getDiscoverSaga, getRequest)]);
  // yield all([takeEvery(actionTypes.GET_RECENT_STORIES, getRecentStoriesSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_CUISINES, getCuisinesSaga, getRequest)]);
  // yield all([takeEvery(actionTypes.POST_CUISINE_FOODS,postCuisineFoodsSaga, postRequest,),]);
  // yield all([takeEvery(actionTypes.GET_DIET_PREFERENCE,getDietPreferenceSaga,getRequest,),]);
  // yield all([takeEvery(actionTypes.POST_DIET_PREFERENCE,postDietPreferenceSaga,postRequest,),]);
  // yield all([takeEvery(actionTypes.POST_ALLERGIES_FOODS,postAllergiesFoodsSaga,postRequest,),]);
  // yield all([takeEvery(actionTypes.CREATE_DIET_PLAN, createDietPlanSaga, postRequest),]);
  // yield all([takeEvery(actionTypes.GET_DIET_PLAN, getDietPlanSaga, postRequest),]);
  // yield all([takeEvery(actionTypes.GET_DIET_FOOD_INFO, getDietFoodInfoSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_SIMILAR_FOODS, getSimilarFoodSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_FOOD_ITEM_BF, getFoodItemBfSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_FOOD_ITEM_LU, getFoodItemLuSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.GET_FOOD_ITEM_SN, getFoodItemSnSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.SEARCH_FOOD_ITEM, searchFoodItemSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.SUBMIT_FOOD_ITEM, submitFoodItemSaga, postRequest),]);
  // yield all([takeEvery(actionTypes.CHECK_FLOW_DIET_PLAN, checkFlowSaga, getRequest),]);
  // yield all([takeEvery(actionTypes.SET_TRACK_FOOD, setTrackFoodSaga, postRequest),]);
  // yield all([takeEvery(actionTypes.CHANGE_RANDOM_FOOD,changeRandomFoodSaga,postRequest,),]);
  // yield all([takeLatest(actionTypes.GET_MENU_LIST, getMenuListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_FAQ_LIST_DATA, getFaqListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_COMMUNITY_LIST_DATA, getCommunityListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.DEACTIVATE_ACCOUNT, deactivateAccountSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.DELETE_ACCOUNT, deleteAccountSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.SUMMARY, addSummarySaga, putRequest),]);
  // yield all([takeLatest(actionTypes.DELETE_ACTIVITY, deleteActivitySaga, putRequest),]);
  // yield all([takeLatest(actionTypes.GET_COMMUNITY_GROUP_LIST_DATA, getCommunityGroupListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.ALL_HOME, getAllHomeSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.REGISTER_EVENT, registerEventSaga, postRequest)]);
  // yield all([takeLatest(actionTypes.GET_EVENT_CATEGORY, eventCategorySaga, getRequest)]);
  // yield all([takeLatest(actionTypes.GET_ALL_EVENTS, eventAllSaga, postRequest)]);
  // yield all([takeLatest(actionTypes.GET_CATEGORY_EVENTS, eventByCategorySaga, postRequest)]);
  // yield all([takeLatest(actionTypes.GET_FINACIAL_RESOURCE, financialResourcesSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.MY_BOOKMARK, myBookmarkSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.GET_FINACIAL_RESOURCE_BY_ID, financialResourceByIdSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA, getCommunityCategoryListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_COMMUNITY_BYID_LIST_DATA, getCommunityByIdListDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.RULES_ALL, getRulesSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_COMMUNITY_DETAIL_DATA, getCommunityDetailDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_GROUP_DETAIL_DATA, getCommunityGroupDetailDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.POST_JOIN_GROUP, joinGroupSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.POST_PIN_GROUP, pinGroupSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.GET_GROUP_MEMBERS_DATA, getGroupMemberDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_GROUP_POSTS_DATA, getGroupPostDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.CAM_TREATMENT_ALL, callFetchCamTreatmentsSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.MED_TREATMENT_ALL, callFetchMedicalTreatmentsSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_POST, callCreatePostSaga, postFormDataRequest),]);
  // yield all([takeLatest(actionTypes.HEALTH_STATUS_ALL, callFetchHealthStatusSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.PROFILE_POST, profilePostDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.LIKE_FOOD, likeFoodSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.INGREDIENTS, getIngredientsSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.PRODUCT_CATEGORY, getProductCategories, getRequest),]);
  // yield all([takeLatest(actionTypes.PRODUCT, getProducts, getRequest),]);
  // yield all([takeLatest(actionTypes.CATEGORY_PRODUCT, getCategoryProducts, getRequest),]);
  // yield all([takeLatest(actionTypes.PRODUCT_DETAIL, getProductDetail, getRequest),]);
  // yield all([takeLatest(actionTypes.TAG_DATA, getTagDataSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.POST_CATEGORY, getPostCategorySaga, getRequest),]);
  // yield all([takeLatest(actionTypes.FOLLOW_USER, followUserSaga, postRequest)]);
  // yield all([takeLatest(actionTypes.CREATE_ORDER, createOrderSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_CUSTOMER, createCustomerSaga, postEcommerceRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_CUSTOMER_SERVER, createCustomerServerSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.FETCH_CUSTOMER, fetchCustomerSaga, getEcommerceRequest),]);
  // yield all([takeLatest(actionTypes.EDIT_CUSTOMER, editCustomerSaga, postEcommerceRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_ORDER_SERVER, createOrderServerSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.GET_DETAIL_MENU_ITEM,getDetailMenuItemSaga,getRequest,),]);
  // yield all([takeLatest(actionTypes.PRODUCT_IMAGES, getProductImagesSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_CART, createCartSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.GET_CART, getCartSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_JOURNAL_LIST, getJournalSaga, getJournalRequest),]);
  // yield all([takeLatest(actionTypes.UPDATE_CART, updateCartSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.DELETE_CART, deleteCartSaga, deleteRequest),]);
  // yield all([takeLatest(actionTypes.GET_ADDRESS, getAddressSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_ADDRESS, createAddressSaga, postRequest),]),
  // yield all([takeLatest(actionTypes.GET_CALENDAR, getCalendarSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_CALENDAR_SUGGESTION, getCalendarSuggestionSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.ADD_CALENDAR, addCalendarSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.LEAVE_GROUP, leaveGroupSaga, deleteRequest),]);
  // yield all([takeLatest(actionTypes.DELETE_COMMENT, editCommentSaga, deleteRequest),]);
  // yield all([takeLatest(actionTypes.EDIT_COMMENT, deleteCommentSaga, postFormDataRequest),]);
  // yield all([takeLatest(actionTypes.CLEAR_CART, clearUserCartSaga, deleteRequest),]);
  // yield all([takeLatest(actionTypes.GET_CONDITION, getConditionSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.EDIT_IMAGE, callEditImageSaga, postFormDataRequest),]);
  // yield all([takeLatest(actionTypes.GET_CHAT_CONVERSATION, getChatConversationSaga, getChatRequest),]);
  // yield all([takeLatest(actionTypes.GET_MY_REPORTS_LIST, getMyReportsSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GROUP_SEARCH, callGroupSearchData, getRequest),]);
  // yield all([takeLatest(actionTypes.CALENDAR_CATEGORY, calendarCategorySaga, getRequest),]);
  // yield all([takeLatest(actionTypes.NOTIFICATION_TOGGLE, notificationToogleSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.FETCH_OTHER_DETAILS, callOtherProfileSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.ALL_WELLNESS, allWllnessSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_ONCOLOGIST_LIST, getOncologistSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_ONCOLOGIST_FILTER_LIST, getOncologistFilterSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.EDIT_CALENDAR, editCalendarSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.CREATE_STREAK, creatStreakSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.GET_REPORTS_CATEGORY_LIST, getReportsCategorySaga, getRequest)])
  // yield all([takeLatest(actionTypes.GET_SPECIALIZATION_LIST, getSpecializationSaga, getRequest)])
  // yield all([takeLatest(actionTypes.GET_REPORTS_FILTER_LIST, getReportFilterSaga, getRequest)])
  // yield all([takeLatest(actionTypes.GET_ONCOLOGIST_DR, getOncologistDrSaga, getRequest)])
  // yield all([takeLatest(actionTypes.GET_LEADERBOARD_LIST, getLeaderboardSaga, getRequest)])
  // yield all([takeLatest(actionTypes.GET_SYMPTOMS_LIST, getSymptomsSaga, getRequest)])
  // yield all([takeLatest(actionTypes.DELETE_POST, deletePostSaga, deleteRequest)])
  // yield all([takeLatest(actionTypes.TREATMENT_DATA, fetchTreatmentSaga, getRequest)])
  // yield all([takeLatest(actionTypes.SAVE_CONDITION, saveConditionSaga, postRequest),]);
  // yield all([takeLatest(actionTypes.GET_PRODUCT_REVIEWS, getProductReviewSaga, getRequest),]);
  // yield all([takeLatest(actionTypes.GET_TREATMENT_LIST, getTreatmentSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.GET_PROFILE_MATCH_LIST, getProfileMatchSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.GET_HOME_SEARCH_LIST, getHomeSearchSaga, getRequest)]);
  // yield all([takeLatest(actionTypes.COACH_CHAT, getCoachChatSaga, getRequest)]);
}
