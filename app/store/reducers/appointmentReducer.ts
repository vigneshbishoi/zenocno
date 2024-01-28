import actionTypes from "../actions/types";
import createReducer from "../../lib/createReducer";
// import { IAppointmentState } from "../../models/reducers/appointment";

export interface IAppointmentState {
    data: object,
    searchData: [],
}

const initialState: IAppointmentState = {
    data: {},
    searchData: [],
}

export const appointmentReducer = createReducer(initialState, {
    //for fetching appointment Data
    [actionTypes.FETCH_APPOINTMENT](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.FETCH_APPOINTMENT_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },  
    //for fetching doctors Data
    [actionTypes.FETCH_DOCTORS](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.FETCH_DOCTORS_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    }, 
    //for fetching search doctors Data
    [actionTypes.FETCH_DOCTORS_SEARCH](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.FETCH_DOCTORS_SEARCH_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            searchData: action?.data?.doctor_review.length > 0 ? action?.data?.doctor_review : []
        }
    }, 
    //for fetching doctors Scehdule
    [actionTypes.DOCTOR_SCHEDULE](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DOCTOR_SCHEDULE_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },  
    //for fetching doctor detail
    [actionTypes.DOCTOR_DETAIL](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DOCTOR_DETAIL_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },  
    //for book appointment
    [actionTypes.BOOK_APPOINTMENT](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.BOOK_APPOINTMENT_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },  
    //for cancel appointment
    [actionTypes.CANCEL_APPOINTMENT](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CANCEL_APPOINTMENT_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },  
    //for reschedule appointment
    [actionTypes.RESCHEDULE_APPOINTMENT](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.RESCHEDULE_APPOINTMENT_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for docotor Category
    [actionTypes.DOCTOR_CATEGORY](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DOCTOR_CATEGORY_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for docotor review
    [actionTypes.DOCTOR_REVIEW](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DOCTOR_REVIEW_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for docotor write review
    [actionTypes.WRITE_REVIEW](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.WRITE_REVIEW_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for cancel options
    [actionTypes.CANCEL_OPTIONS](state: IAppointmentState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CANCEL_OPTIONS_DATA](state: IAppointmentState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_PATIENT_DETAIL_DATA](state: IAppointmentState, action: any) {

        console.log('ACTION  -->', action);
        

        return {
            ...state,
            [action.index]: [action.data]
        }
    },
})