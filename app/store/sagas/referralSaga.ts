import * as referralAction from '../actions/referralAction';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get all ReferralCode

export function* getReferralCodeSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getReferralCodeData(
                'getreferralCode',
                response.data,
                actionTypes.GET_REFERRAL_CODE_DATA,
            ),
        );
        yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for get all Referral reedem coin

export function* getReferralCoinSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getReferralCodeData(
                'getreferralCoin',
                response.data,
                actionTypes.GET_REFERRAL_COIN_DATA,
            ),
        );
        yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for get News List
export function* getNewsListSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getNewsData(
                'news',
                response.data,
                actionTypes.NEWS_LIST_DATA,
                payload?.payload?.formData?.page
            ),
        );
        yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for get News Bookmark
export function* getNewsBookMarktSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getNewsBookMarkData(
                'news',
                response.data,
                actionTypes.GET_NEWS_BOOKMARK_DATA,
            ),
        );
        yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for get News Detail
export function* getNewsDetailSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getNewsByIdData(
                'newsDetail',
                response.data,
                actionTypes.NEWS_DETAIL_DATA,
            ),
        );
        yield put(referralAction.loader('loader', false, actionTypes.LOADER));
    } catch (e: any) {
        console.log('error', e.message);
    }
}

//for get News Search Data
export function* getNewsSearchSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload);
        yield put(
            referralAction.getNewsSearchData(
                'newsSearch',
                response.data,
                actionTypes.NEWS_SEARCH_DATA,
            ),
        );
    } catch (e: any) {
        console.log('error', e.message);
    }
}

