import actionTypes from "../actions/types";

import {
    ISearchRequestState,
    ISearchResponseState
} from "../../models/actions/onboarding"

import { ISearchState } from "../../models/reducers/onboarding";

/* Reducer for geting all cancer list
    *
 */

import createReducer from "../../lib/createReducer";
import { State } from "react-native-gesture-handler";
import { act } from "react-test-renderer";

const initialState: ISearchState = {
    search_data: {}
}

export const onboardingReducer = createReducer(initialState, {
    [actionTypes.LOADER](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        };
    },
    //getall api for cancer
    [actionTypes.CANCER_SEARCH_ALL](state: ISearchState, action: any) {
        console.log("from reducers")
        return {
            ...state
        }
    },
    //getall data api for cancer
    [actionTypes.CANCER_SEARCH_ALL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    //search api for cancer

    [actionTypes.CANCER_SEARCH](state: ISearchState, action: any) {
        console.log("from reduces")
        return {
            ...state
        }
    },

    //search data api for cancer
    [actionTypes.CANCER_SEARCH_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },

    //getall api for city
    [actionTypes.CITY_SEARCH_ALL](state: ISearchState, action: any) {
        console.log("form cities reducer")
        return {
            ...state
        }
    },
    [actionTypes.CITY_SEARCH_ALL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },

    //search api for city

    [actionTypes.CITY_SEARCH](state: ISearchState, action: any) {
        console.log("from reduces")
        return {
            ...state
        }
    },

    //search data api for city
    [actionTypes.CITY_SEARCH_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },



    //call api for userdetails
    [actionTypes.ADD_USER_DETAILS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },

    //data api for userdetails
    [actionTypes.ADD_USER_DETAILS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },

    //call api for EDIT userdetails
    [actionTypes.EDIT_USER_DETAILS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },

    //data api for EDIT userdetails
    [actionTypes.EDIT_USER_DETAILS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },

    //call api for userProfile
    [actionTypes.GET_ALL_USERPROFILE](state: ISearchState, action: any) {
        return {
            ...state
        }
    },

    //data api for userProfile
    [actionTypes.GET_ALL_USERPROFILE_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },

    //for cancer stage api
    [actionTypes.GET_CANCER_STAGE](state: ISearchState, action: any) {
        return {
            ...state,
        }
    },
    //for cancer stage data
    [actionTypes.GET_CANCER_STAGE_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    //for country api
    [actionTypes.GET_COUNTRY](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    //for country data
    [actionTypes.GET_COUNTRY_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for cuisine
    [actionTypes.GET_CUISINE](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    //for cuisine data
    [actionTypes.GET_CUISINE_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for physica activity 
    [actionTypes.GET_PHYSICAL_ACTIVITY](state: ISearchState, action: any) {
        console.log("from reduces activity")
        return {
            ...state
        }
    },
    //for physical activity data
    [actionTypes.GET_PHYSICAL_ACTIVITY_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for treatment
    [actionTypes.GET_TREATMENT](state: ISearchState, action: any) {
        return {
            ...state
        }
    },

    [actionTypes.GET_TREATMENT_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    [actionTypes.GET_SYMPTOMS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_SYMPTOMS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_FACTORS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_FACTORS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_MEDICAL_ISSUES](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_MEDICAL_ISSUES_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_MEDICATIONS](state: ISearchState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_MEDICATIONS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_PAYMENT](state: ISearchState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_PAYMENT_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_PAYMENT_PLANS_DATA](state: ISearchState, action: any) {
        console.log("from plans")
        return {
            ...state,
        }
    },
    [actionTypes.GET_PAYMENT_PLANS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_PAYMENT_VERFIY](state: ISearchState, action: any) {

        return {
            ...state,
        }
    },
    [actionTypes.GET_PAYMENT_VERIFY_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.FETCH_USER_DETAILS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.FETCH_USER_DETAILS_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.MED_TREATMENT_ALL](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.MED_TREATMENT_ALL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.CAM_TREATMENT_ALL](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.CAM_TREATMENT_ALL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.HEALTH_STATUS_ALL](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.HEALTH_STATUS_ALL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.EDIT_IMAGE](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.EDIT_IMAGE_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.FETCH_OTHER_DETAILS](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.FETCH_OTHER_DETAIL_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.TREATMENT_DATA](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.TREATMENT_DATA_ALL](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    [actionTypes.GET_ONBOARD](state: ISearchState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_ONBOARD_DATA](state: ISearchState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    }
})