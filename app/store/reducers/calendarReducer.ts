import actionTypes from "../actions/types";
import createReducer from "../../lib/createReducer";
import { ICalendarState } from "../../models/reducers/calendar";

const initialState: ICalendarState = {
    data: {}
}

export const calendarReducer = createReducer(initialState, {
    //for getting Calendar Data
    [actionTypes.GET_CALENDAR](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CALENDAR_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_CALENDAR_SUGGESTION](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CALENDAR_SUGGESTION_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for add Calendar Data
    [actionTypes.ADD_CALENDAR](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.ADD_CALENDAR_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

     //for Calendar Category Data
     [actionTypes.CALENDAR_CATEGORY](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CALENDAR_CATEGORY_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for edit Calendar Data
    [actionTypes.EDIT_CALENDAR](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.EDIT_CALENDAR_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for create daily streak
    [actionTypes.CREATE_STREAK](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_STREAK_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for delete Activity
    [actionTypes.DELETE_ACTIVITY](state: ICalendarState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DELETE_ACTIVITY_DATA](state: ICalendarState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    
})