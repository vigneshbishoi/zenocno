import actionTypes from '../actions/types';
import { IPatientState } from '../../models/reducers/patient';

/* Reducer for geting all cancer list
 *
 */
import createReducer from '../../lib/createReducer';

const initialState: IPatientState = {
    data: {},
};

export const patientReducer = createReducer(initialState, {
    [actionTypes.FETCH_PATIENT](state: IPatientState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.FETCH_PATIENT_DATA](state: IPatientState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.POST_PATIENT](state: IPatientState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.POST_PATIENT_DATA](state: IPatientState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.PATIENT_REFERAL](state: IPatientState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.PATIENT_REFERAL_DATA](state: IPatientState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.INVITED_PATIENT](state: IPatientState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.INVITED_PATIENT_DATA](state: IPatientState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
    [actionTypes.DELETE_PATIENT](state: IPatientState, action: any) {
        return {
            ...state,
        };
    },
    [actionTypes.DELETE_PATIENT_DATA](state: IPatientState, action: any) {
        return {
            ...state,
            [action.index]: [action.data],
        };
    },
});
