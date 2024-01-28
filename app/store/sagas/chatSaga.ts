import * as chatAction from '../actions/chatAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get chat conversations data
export function* getChatConversationSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(chatAction.getChatConversationData("chatConversationData", response.data, actionTypes.GET_CHAT_CONVERSATION_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}

//for coach chat
export function* getCoachChatSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(chatAction.getCoachChatIdData("coachData", response.data, actionTypes.COACH_CHAT_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}