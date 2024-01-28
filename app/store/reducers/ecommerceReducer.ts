import actionTypes from "../actions/types";
import createReducer from "../../lib/createReducer";
import { IEcommerceState } from "../../models/reducers/ecommerce";

const initialState: IEcommerceState = {
    data: {}
}

export const ecommerceReducer = createReducer(initialState, {
    //for getting Categories
    [actionTypes.PRODUCT_CATEGORY](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.PRODUCT_CATEGORY_ALL](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for getting Products
    [actionTypes.PRODUCT](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.PRODUCT_ALL](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for getting CategoryWise Products
    [actionTypes.CATEGORY_PRODUCT](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CATEGORY_PRODUCT_ALL](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
     //for getting Product Detail
     [actionTypes.PRODUCT_DETAIL](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.PRODUCT_DETAIL_ALL](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for Add To Cart
    [actionTypes.ADD_CART](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: action.data
        }
    },
    //for create Order Detail
    [actionTypes.CREATE_ORDER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_ORDER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for create Customer 
    [actionTypes.CREATE_CUSTOMER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_CUSTOMER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    //for create Customer Server
    [actionTypes.CREATE_CUSTOMER_SERVER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_CUSTOMER_SERVER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for Fetch Customer
    [actionTypes.FETCH_CUSTOMER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.FETCH_CUSTOMER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for Edit Customer
    [actionTypes.EDIT_CUSTOMER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.EDIT_CUSTOMER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for Create Order Server
    [actionTypes.CREATE_ORDER_SERVER](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_ORDER_SERVER_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for product images
    [actionTypes.PRODUCT_IMAGES](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.PRODUCT_IMAGES_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for create cart data
    [actionTypes.CREATE_CART](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_CART_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for get cart data
    [actionTypes.GET_CART](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_CART_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    
    //for update cart data
    [actionTypes.UPDATE_CART](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.UPDATE_CART_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    
    //for delete cart data
    [actionTypes.DELETE_CART](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.DELETE_CART_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

    //for get address data
    [actionTypes.GET_ADDRESS](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_ADDRESS_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
    
    //for create address data
    [actionTypes.CREATE_ADDRESS](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.CREATE_ADDRESS_DATA](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },

     //for get reviews data
     [actionTypes.GET_PRODUCT_REVIEWS](state: IEcommerceState, action: any) {
        return {
            ...state,
        }
    },
    [actionTypes.GET_PRODUCT_REVIEWS](state: IEcommerceState, action: any) {
        return {
            ...state,
            [action.index]: [action.data]
        }
    },
})