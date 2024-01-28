import * as calendarAction from '../actions/calendarAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get calendar data
export function* getCalendarSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.getCalendarData("calendarData", response.data, actionTypes.GET_CALENDAR_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for get Calendar Suggestion data
export function* getCalendarSuggestionSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        console.log("_Suggestion", response.data.data)
        yield put(calendarAction.getCalendarSuggestionData("calendarsuggestion", response.data, actionTypes.GET_CALENDAR_SUGGESTION_DATA))
    }
    catch (e: any) {
        console.log("error_Suggestion", e.message)
    }
}

//for add calendar data
export function* addCalendarSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.addCalendarData("addCalendarData", response.data, actionTypes.ADD_CALENDAR_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for calendar category data
export function* calendarCategorySaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.calendarCategoryData("calendarCategory", response.data, actionTypes.CALENDAR_CATEGORY_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for edit calendar data
export function* editCalendarSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.editCalendarData("addCalendarData", response.data, actionTypes.EDIT_CALENDAR_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for create daily streak
export function* creatStreakSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.creatStreakData("streakData", response.data, actionTypes.CREATE_STREAK_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for delete Activity
export function* deleteActivitySaga(service: any, payload: object): any {
    console.log("@34--")
    try {
        const response = yield call(service, payload)
        yield put(calendarAction.deleteActivityData("activity", response.data, actionTypes.DELETE_ACTIVITY_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}