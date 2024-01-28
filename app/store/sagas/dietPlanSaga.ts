import * as dietPlanActions from '../actions/dietPlanActions';
import actionTypes from '../actions/types';
import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { resolvePlugin } from '@babel/core';
import { storiesReducer } from '../reducers/storiesReducer';
/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */

//for get cuisines

export function* getCuisinesSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getCuisinesData("cuisinesData", response.data, actionTypes.GET_CUISINES_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for getting diet preference
export function* getDietPreferenceSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getDietPreferenceData("dietPreferenceData", response.data, actionTypes.GET_DIET_PREFERENCE_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for post diet preference
export function* postDietPreferenceSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.postDietPreferenceData("postDietPreferenceData", response.data, actionTypes.POST_DIET_PREFERENCE_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for post cuisine foods
export function* postCuisineFoodsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.postCuisineFoodsData("postCuisineFoods", response.data, actionTypes.POST_CUISINE_FOODS_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for post cuisine foods
export function* postAllergiesFoodsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.postAllergiesFoodsData("postAllergiesFoods", response.data, actionTypes.POST_ALLERGIES_FOODS_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for creating diet plan
export function* createDietPlanSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.createDietPlanData("createDietPlanDAta", response.data, actionTypes.CREATE_DIET_PLAN_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for getting dietplan
export function* getDietPlanSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getDietPlanData("dietPlanData", response.data, actionTypes.GET_DIET_PLAN_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for getting diet food info
export function* getDietFoodInfoSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getDietFoodInfoData("dietFoodInfo", response.data, actionTypes.GET_DIET_FOOD_INFO_DATA))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for getting similar Items
export function* getSimilarFoodSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getSimilarFoodData("similarFoods", response.data, actionTypes.GET_SIMILAR_FOODS_DATA))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for getting daywise ingredients
export function* getIngredientsSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.ingredientsData("ingredients", response.data, actionTypes.INGREDIENTS_ALL))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for getting food item breakfast
export function* getFoodItemBfSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getFoodItemBfData("foodBfData", response.data, actionTypes.GET_FOOD_ITEM_DATA_BF))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for getting food item lunch
export function* getFoodItemLuSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getFoodItemLuData("foodLuData", response.data, actionTypes.GET_FOOD_ITEM_DATA_LU))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for getting food item snacks
export function* getFoodItemSnSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getFoodItemSnData("foodSnData", response.data, actionTypes.GET_FOOD_ITEM_DATA_SN))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for searching food item
export function* searchFoodItemSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.searchFoodItemData("searchFoodItemData", response.data, actionTypes.SEARCH_FOOD_ITEM_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for submit food item
export function* submitFoodItemSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.submitFoodItemData("submitFoodItemData", response.data, actionTypes.SUBMIT_FOOD_ITEM_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
export function* setTrackFoodSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        console.log("setTrack", response.data)
        yield put(dietPlanActions.setTrackFoodData("setTrack", response.data, actionTypes.SET_TRACK_FOOD_DATA))
    }
    catch (e: any) {
        console.log("error", e)
    }
}
//for flow checking
export function* checkFlowSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.checkFlowData("flowData", response.data, actionTypes.CHECK_FLOW_DIET_PLAN_DATA))
        yield put(dietPlanActions.loader("loader", false, actionTypes.LOADER))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for change Random Food
export function* changeRandomFoodSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)

        yield put(dietPlanActions.changeRandomFoodData("changeRandomFood", response.data, actionTypes.CHANGE_RANDOM_FOOD_DATA))

    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for like Food
export function* likeFoodSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.likeFoodData("likeFood", response.data, actionTypes.LIKE_FOOD_ALL))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for subscription data
export function* getSubscriptionSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.subscriptionData("plan", response.data, actionTypes.SUBSCRIPTION_PLAN_DATA))
    }
    catch (e: any) {
        console.log("error", e)
    }
}

//for get Allergies food
export function* getAllergiesSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(dietPlanActions.getAllergiesFoodsData("allergies", response.data, actionTypes.GET_ALLERGIES_FOODS_DATA))
    }
    catch (e: any) {
        console.log("error", e)
    }
}