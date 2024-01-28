import actionTypes from "../actions/types";
import createReducer from "../../lib/createReducer";
import { IClinicalTrialsState } from "../../models/reducers/clinicaltrials";

const initialState: IClinicalTrialsState = {
    data: {}
}

export const clinicalTrialsReducer = createReducer(initialState, {
    //for getting Calendar Data
    [actionTypes.GET_CONDITION](state: IClinicalTrialsState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CONDITION_DATA](state: IClinicalTrialsState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.SAVE_CONDITION](state: IClinicalTrialsState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.SAVE_CONDITION_DATA](state: IClinicalTrialsState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
})