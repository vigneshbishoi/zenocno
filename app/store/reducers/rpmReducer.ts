import actionTypes from '../actions/types';
import { IRpmState } from '../../models/reducers/rpm';

/* Reducer for geting all cancer list
 *
 */
import createReducer from '../../lib/createReducer';

const initialState: IRpmState = {
    data: {},
};

export const rpmReducer = createReducer(initialState, {
    [actionTypes.RPM_GET_PERMISSION](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.RPM_GET_PERMISSION_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.RPM_POST_PERMISSION](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.RPM_POST_PERMISSION_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.FETCH_SOS](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.FETCH_SOS_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.CREATE_SOS](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.CREATE_SOS_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.DELETE_SOS](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.DELETE_SOS_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.FETCH_RPM](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.FETCH_RPM_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.POST_RPM](state: IRpmState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.POST_RPM_DATA](state: IRpmState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
});
