import actionTypes from "../actions/types";

import {
    IDietRequestState,
    IDietResponseState
} from "../../models/actions/dietplan"


/* Reducer for geting all cancer list
    *
 */

import createReducer from "../../lib/createReducer";
import { State } from "react-native-gesture-handler";
import { act } from "react-test-renderer";
import { IDietState } from "../../models/reducers/dietplan";

const initialState: IDietState = {
    data: {}
}
export const dietPlanReducer = createReducer(initialState, {
    [actionTypes.LOADER](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        };
    },

    //for getting cuisines
    [actionTypes.GET_CUISINES](state: IDietState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CUISINES_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for getting diet preference
    [actionTypes.GET_DIET_PREFERENCE](state: IDietState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_DIET_PREFERENCE_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for post diet preference
    [actionTypes.POST_DIET_PREFERENCE](state: IDietState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.POST_DIET_PREFERENCE_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for post cuisine foods
    [actionTypes.POST_CUISINE_FOODS](state: IDietState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.POST_CUISINE_FOODS_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.CREATE_DIET_PLAN](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.CREATE_DIET_PLAN_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_DIET_PLAN](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.GET_DIET_PLAN_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_DIET_FOOD_INFO](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.GET_DIET_FOOD_INFO_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_SIMILAR_FOODS](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.GET_SIMILAR_FOODS_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.GET_FOOD_ITEM_LU](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_FOOD_ITEM_SN](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_FOOD_ITEM_BF](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    //for food item break fast
    [actionTypes.GET_FOOD_ITEM_DATA_BF](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },


    [actionTypes.SET_TRACK_FOOD](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.SET_TRACK_FOOD_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for food item lunch
    [actionTypes.GET_FOOD_ITEM_DATA_LU](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for food item snacks
    [actionTypes.GET_FOOD_ITEM_DATA_SN](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
    }
    },
    [actionTypes.CHANGE_RANDOM_FOOD](state: IDietState, action: any) {
        return {
            ...state,

        }
    },
    [actionTypes.CHANGE_RANDOM_FOOD_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }

    },

    [actionTypes.SEARCH_FOOD_ITEM](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.SEARCH_FOOD_ITEM_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.SUBMIT_FOOD_ITEM](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.SUBMIT_FOOD_ITEM_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.CHECK_FLOW_DIET_PLAN](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.CHECK_FLOW_DIET_PLAN_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.LIKE_FOOD](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.LIKE_FOOD_ALL](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.INGREDIENTS](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.INGREDIENTS_ALL](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    [actionTypes.SUBSCRIPTION_PLAN](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.SUBSCRIPTION_PLAN_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    [actionTypes.GET_ALLERGIES_FOODS](state: IDietState, action: any) {
        return {
            ...state
        }
    },
    [actionTypes.GET_ALLERGIES_FOODS_DATA](state: IDietState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

})