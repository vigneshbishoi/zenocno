import actionTypes from "../actions/types";
import createReducer from "../../lib/createReducer";
import { IChatState } from "../../models/reducers/chat";

const initialState: IChatState = {
    data: {}
}

export const chatReducer = createReducer(initialState, {
    //for getting chat media Data
    [actionTypes.GET_CHAT_CONVERSATION](state: IChatState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CHAT_CONVERSATION_DATA](state: IChatState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for coach chat
    [actionTypes.COACH_CHAT](state: IChatState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.COACH_CHAT_DATA](state: IChatState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
})