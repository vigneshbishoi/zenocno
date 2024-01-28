import actionTypes from '../actions/types';
import { all, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest, postFormDataRequest, deleteRequest, putRequest } from '../../services/stories';
import { getEcommerceRequest, postEcommerceRequest } from '../../services/ecommerce';
import { getChatRequest } from '../../services/chat';

import {
  callFetchCamTreatmentsSaga,
  callFetchHealthStatusSaga,
  callFetchMedicalTreatmentsSaga,
  callCreatePostSaga,
  callEditImageSaga,
  callOtherProfileSaga,
  fetchTreatmentSaga
} from './onboardingSaga';

import {
  getDetailMenuItemSaga,
  profilePostDataSaga,
  getTagDataSaga,
  followUserSaga,
  leaveGroupSaga,
  editCommentSaga,
  deleteCommentSaga,
  callGroupSearchData,
  allWllnessSaga,
  deletePostSaga,
  getPostCategorySaga,
  postSearchSaga,
  getPostCommentSaga,
  getNotificationSaga,
  likeWellnessSaga,
  getNotificationReadSaga
} from './storiesSaga';
import {
  getJournalCategorySaga,
  getJournalSearchSaga,
  getJournalSaga, getSymptomsSaga, getJournalItemSaga
} from './journalSaga'
import {
  likeFoodSaga,
  getIngredientsSaga,
  getSubscriptionSaga
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
} from './calendarSaga';
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
  notificationToogleSaga
} from './settingSaga';
import { getJournalRequest } from '../../services/journal';
import { getChatConversationSaga, getCoachChatSaga } from './chatSaga';
import {
  getMyReportsSaga, getReportFilterSaga, getReportsCategorySaga
} from './myReportsSaga'
import { getLeaderboardSaga } from './leaderboardSaga';
import { getProfileMatchSaga, getTreatmentSaga } from './profileMatchSaga';
import { getHomeSearchSaga } from './homeSearchSaga';

export const saga3 = [
  takeLatest(actionTypes.CAM_TREATMENT_ALL, callFetchCamTreatmentsSaga, getRequest),
  takeLatest(actionTypes.MED_TREATMENT_ALL, callFetchMedicalTreatmentsSaga, getRequest),
  takeLatest(actionTypes.CREATE_POST, callCreatePostSaga, postFormDataRequest),
  takeLatest(actionTypes.HEALTH_STATUS_ALL, callFetchHealthStatusSaga, getRequest),
  takeLatest(actionTypes.PROFILE_POST, profilePostDataSaga, getRequest),
  takeLatest(actionTypes.LIKE_FOOD, likeFoodSaga, postRequest),
  takeLatest(actionTypes.INGREDIENTS, getIngredientsSaga, postRequest),
  takeLatest(actionTypes.SUBSCRIPTION_PLAN, getSubscriptionSaga, getRequest),
  takeLatest(actionTypes.PRODUCT_CATEGORY, getProductCategories, getRequest),
  takeLatest(actionTypes.PRODUCT, getProducts, getRequest),
  takeLatest(actionTypes.CATEGORY_PRODUCT, getCategoryProducts, getRequest),
  takeLatest(actionTypes.PRODUCT_DETAIL, getProductDetail, getRequest),
  takeLatest(actionTypes.TAG_DATA, getTagDataSaga, getRequest),
  takeLatest(actionTypes.POST_CATEGORY, getPostCategorySaga, getRequest),
  takeLatest(actionTypes.FOLLOW_USER, followUserSaga, postRequest),
  takeLatest(actionTypes.CREATE_ORDER, createOrderSaga, postRequest),
  takeLatest(actionTypes.CREATE_CUSTOMER, createCustomerSaga, postEcommerceRequest),
  takeLatest(actionTypes.CREATE_CUSTOMER_SERVER, createCustomerServerSaga, postRequest),
  takeLatest(actionTypes.FETCH_CUSTOMER, fetchCustomerSaga, getEcommerceRequest),
  takeLatest(actionTypes.EDIT_CUSTOMER, editCustomerSaga, postEcommerceRequest),
  takeLatest(actionTypes.CREATE_ORDER_SERVER, createOrderServerSaga, postRequest),
  takeLatest(actionTypes.GET_DETAIL_MENU_ITEM,getDetailMenuItemSaga,getRequest,),
  takeLatest(actionTypes.PRODUCT_IMAGES, getProductImagesSaga, getRequest),
  takeLatest(actionTypes.CREATE_CART, createCartSaga, postRequest),
  takeLatest(actionTypes.GET_CART, getCartSaga, getRequest),
  takeLatest(actionTypes.GET_JOURNAL_LIST, getJournalSaga, getJournalRequest),
  takeLatest(actionTypes.GET_JOURNAL_CATEGORY_LIST, getJournalCategorySaga, getJournalRequest),
  takeLatest(actionTypes.GET_JOURNAL_ITEM, getJournalItemSaga, getJournalRequest),
  takeLatest(actionTypes.GET_JOURNAL_SEARCH_LIST, getJournalSearchSaga, getJournalRequest),
  takeLatest(actionTypes.UPDATE_CART, updateCartSaga, postRequest),
  takeLatest(actionTypes.DELETE_CART, deleteCartSaga, deleteRequest),
  takeLatest(actionTypes.GET_ADDRESS, getAddressSaga, getRequest),
  takeLatest(actionTypes.CREATE_ADDRESS, createAddressSaga, postRequest),
  takeLatest(actionTypes.GET_CALENDAR, getCalendarSaga, getRequest),
  takeLatest(actionTypes.GET_CALENDAR_SUGGESTION, getCalendarSuggestionSaga, getRequest),
  takeLatest(actionTypes.ADD_CALENDAR, addCalendarSaga, postRequest),
  takeLatest(actionTypes.LEAVE_GROUP, leaveGroupSaga, deleteRequest),
  takeLatest(actionTypes.DELETE_COMMENT, deleteCommentSaga, deleteRequest),
  takeLatest(actionTypes.EDIT_COMMENT, editCommentSaga , postFormDataRequest),
  takeLatest(actionTypes.CLEAR_CART, clearUserCartSaga, deleteRequest),
  takeLatest(actionTypes.GET_CONDITION, getConditionSaga, getRequest),
  takeLatest(actionTypes.EDIT_IMAGE, callEditImageSaga, postFormDataRequest),
  takeLatest(actionTypes.GET_CHAT_CONVERSATION, getChatConversationSaga, getChatRequest),
  takeLatest(actionTypes.GET_MY_REPORTS_LIST, getMyReportsSaga, getRequest),
  takeLatest(actionTypes.GROUP_SEARCH, callGroupSearchData, getRequest),
  takeLatest(actionTypes.CALENDAR_CATEGORY, calendarCategorySaga, getRequest),
  takeLatest(actionTypes.NOTIFICATION_TOGGLE, notificationToogleSaga, getRequest),
  takeLatest(actionTypes.FETCH_OTHER_DETAILS, callOtherProfileSaga, getRequest),
  takeLatest(actionTypes.ALL_WELLNESS, allWllnessSaga, getRequest),
  takeLatest(actionTypes.GET_ONCOLOGIST_LIST, getOncologistSaga, getRequest),
  takeLatest(actionTypes.GET_ONCOLOGIST_FILTER_LIST, getOncologistFilterSaga, postRequest),
  takeLatest(actionTypes.EDIT_CALENDAR, editCalendarSaga, postRequest),
  takeLatest(actionTypes.CREATE_STREAK, creatStreakSaga, postRequest),
  takeLatest(actionTypes.GET_REPORTS_CATEGORY_LIST, getReportsCategorySaga, getRequest),
  takeLatest(actionTypes.GET_SPECIALIZATION_LIST, getSpecializationSaga, getRequest),
  takeLatest(actionTypes.GET_REPORTS_FILTER_LIST, getReportFilterSaga, getRequest),
  takeLatest(actionTypes.GET_ONCOLOGIST_DR, getOncologistDrSaga, getRequest),
  takeLatest(actionTypes.GET_LEADERBOARD_LIST, getLeaderboardSaga, getRequest),
  takeLatest(actionTypes.GET_SYMPTOMS_LIST, getSymptomsSaga, getRequest),
  takeLatest(actionTypes.DELETE_POST, deletePostSaga, deleteRequest),
  takeLatest(actionTypes.TREATMENT_DATA, fetchTreatmentSaga, getRequest),
  takeLatest(actionTypes.SAVE_CONDITION, saveConditionSaga, postRequest),
  takeLatest(actionTypes.GET_PRODUCT_REVIEWS, getProductReviewSaga, getRequest),
  takeLatest(actionTypes.GET_TREATMENT_LIST, getTreatmentSaga, getRequest),
  takeLatest(actionTypes.GET_PROFILE_MATCH_LIST, getProfileMatchSaga, getRequest),
  takeLatest(actionTypes.GET_HOME_SEARCH_LIST, getHomeSearchSaga, getRequest),
  takeLatest(actionTypes.COACH_CHAT, getCoachChatSaga, getRequest),
  takeLatest(actionTypes.POST_SEARCH, postSearchSaga, getRequest),
  takeLatest(actionTypes.GET_POST_COMMENT, getPostCommentSaga, getRequest),
  takeLatest(actionTypes.GET_NOTIFICATION, getNotificationSaga, getRequest),
  takeLatest(actionTypes.LIKE_WELLNESS, likeWellnessSaga, postRequest),
  takeLatest(actionTypes.GET_NOTIFICATION_READ, getNotificationReadSaga, putRequest),
];
