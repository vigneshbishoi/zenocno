import * as ecommerceActions from '../actions/ecommerceActions';
import actionTypes from '../actions/types';
import { put, call } from 'redux-saga/effects';

//for get cuisines

export function* getProductCategories(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
//         response.data = [{"id": 0,
//     "category": "All",
//     "image": null,
//     //"status": 1
// }, ...response.data]
        yield put(ecommerceActions.getProductCategoryData("productCategoryData", response.data, actionTypes.PRODUCT_CATEGORY_ALL))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getProducts(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getProductsData("productsData", response.data, actionTypes.PRODUCT_ALL, payload))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getCategoryProducts(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getCategoryProductsData("productsData", response.data, actionTypes.CATEGORY_PRODUCT_ALL))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getProductDetail(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getProductDetailData("productsDetail", response.data, actionTypes.PRODUCT_DETAIL_ALL))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createOrderSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createOrderData("orderDetail", response.data, actionTypes.CREATE_ORDER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createCustomerSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createCustomerData("customerData", response.data, actionTypes.CREATE_CUSTOMER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createCustomerServerSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createCustomerServerData("customerServerData", response.data, actionTypes.CREATE_CUSTOMER_SERVER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* fetchCustomerSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.fetchCustomerData("customerData", response.data, actionTypes.FETCH_CUSTOMER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* editCustomerSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.editCustomerData("editCustomer", response.data, actionTypes.EDIT_CUSTOMER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createOrderServerSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createOrderServerData("orderServer", response.data, actionTypes.CREATE_ORDER_SERVER_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getProductImagesSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getProductImagesData("productImages", response.data, actionTypes.PRODUCT_IMAGES_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createCartSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createCartData("createCart", response.data, actionTypes.CREATE_CART_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getCartSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getCartData("getCart", response.data, actionTypes.GET_CART_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* updateCartSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.updateCartData("updateCart", response.data, actionTypes.UPDATE_CART_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* deleteCartSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.deleteCartData("deleteCart", response.data, actionTypes.DELETE_CART_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getAddressSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getAddressData("addressData", response.data, actionTypes.GET_ADDRESS_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* createAddressSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.createAddressData("createAddress", response.data, actionTypes.CREATE_ADDRESS_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* clearUserCartSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.clearUserCartData("clearUserCart", response.data, actionTypes.CLEAR_CART_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}
export function* getProductReviewSaga(service: any, payload: object): any {
    try {
        const response = yield call(service, payload)
        yield put(ecommerceActions.getProductReviewsData("getProductReviewsData", response.data, actionTypes.GET_PRODUCT_REVIEWS_DATA))
    }
    catch (e: any) {
        console.log("error", e.message)
    }
}