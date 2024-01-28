import actionTypes from "./types";
import { IDietResponse } from "../../models/api/dietPlan";
import { ObjectTypeAnnotation } from "@babel/types";
export function loader(index: string, data: boolean, type: string) {
    return {
        type: type,
        index,
        data,
    };

}

//for cuisines 
export function getCuisines(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getCuisinesData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for diet preference
export function getDietPreference(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getDietPreferenceData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for post diet preference
export function postDietPreference(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function postDietPreferenceData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for post diet preference
export function postCuisineFoods(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function postCuisineFoodsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for get diet preference
export function getAllergiesFoods(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getAllergiesFoodsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for post diet preference
export function postAllergiesFoods(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function postAllergiesFoodsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for createing diet plan

export function createDietPlan(type: string, payload: any) {
    console.log("for dietplan actions")
    return {
        type,
        payload,
    }
}

export function createDietPlanData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for getting dietplan data
export function getDietPLan(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getDietPlanData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for getting diet Food data
export function getDietFoodInfo(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getDietFoodInfoData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for getting similar food items
export function getSimilarFood(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function getSimilarFoodData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}//for getting food item
export function getFoodItemBf(type: string, payload: any) {
    return {
        type,
        payload
    }
}
export function getFoodItemLu(type: string, payload: any) {
    return {
        type,
        payload
    }
}
export function getFoodItemSn(type: string, payload: any) {
    return {
        type,
        payload
    }
}
//data for food item breakfast
export function getFoodItemBfData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//data for food item lunch
export function getFoodItemLuData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//data for food item snacks
export function getFoodItemSnData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}
//for getting search item
export function searchFoodItem(type: string, payload: any) {
    return {
        type,
        payload
    }
}

export function searchFoodItemData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for submit food item
export function submitFoodItem(type: string, payload: any) {
    return {
        type,
        payload
    }
}

export function submitFoodItemData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }

}

//for SET TRACK FOOD ITEM
export function setTrackFood(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function setTrackFoodData(index: string, data: object, type: string) {

    return {
        type: type,
        index,
        data
    }
}

export function chcekFlow(type: string, payload: any) {
    return {
        type,
        payload
    }
}
export function checkFlowData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for SET TRACK FOOD ITEM
export function changeRandomFood(type: string, payload: any) {

    return {
        type,
        payload,
    }
}

export function changeRandomFoodData(index: string, data: object, type: string) {

    return {
        type: type,
        index,
        data
    }
}

//for SET LIKE FOOD ITEM
export function likeFood(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

export function likeFoodData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for DAY WISE Ingredients
export function ingredients(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

export function ingredientsData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for get Subscription Plan
export function subscription(type: string, payload: any) {
    return {
        type,
        payload,
    }
}

export function subscriptionData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}