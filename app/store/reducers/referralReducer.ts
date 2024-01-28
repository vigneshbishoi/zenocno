import actionTypes from '../actions/types';
import { IReferralState } from '../../models/reducers/referral';

/* Reducer for geting all cancer list
 *
 */
import createReducer from '../../lib/createReducer';

const initialState = {
    data: {},
    bookmark:{}
};

export const referralReducer = createReducer(initialState, {
    [actionTypes.LOADER](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: action.data,
        };
    },
    [actionTypes.GET_REFERRAL_CODE](state: IReferralState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.GET_REFERRAL_CODE_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.GET_REFERRAL_COIN](state: IReferralState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.GET_REFERRAL_COIN_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.GET_NEWS_BOOKMARK_UPDATE](state: IReferralState, action: any) {
        // let UpdateData = null
        if(state?.news?.length > 0){
            let Data = state?.news[0]?.data
            Data.filter((item, index) => {
                if(item?.id == action?.payload?.selectOption?.id)
                {
                    state.news[0].data[index].news_bookmarks = [{id: 
                            action?.payload?.selectOption?.id
                        }]
                }
            })
        }
        return {
            ...state,
        };
    },
    [actionTypes.NEWS_LIST](state: IReferralState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.NEWS_LIST_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: action?.page == 1 ? [action.data] : [
                {
                    data: [...state[action.index][0].data, ...action.data.data],
                    message: action?.data?.message,
                    status: action?.data?.status
                }],
        };
    },
    [actionTypes.NEWS_DETAIL](state: IReferralState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.NEWS_DETAIL_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: [
                {
                    data: action.data.data,
                    message: action?.data?.message,
                    status: action?.data?.status
                }]
        };
    },
    [actionTypes.NEWS_SEARCH](state: IReferralState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.NEWS_SEARCH_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.GET_NEWS_BOOKMARK_DATA](state: IReferralState, action: any) {
        return {
            ...state,
            bookmark: [action.data],
        };
    },
});
