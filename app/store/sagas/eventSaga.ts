import * as eventAction from '../actions/eventAction';
import actionTypes from '../actions/types';
import {put, call} from 'redux-saga/effects';


//for get event Category
export function* eventCategorySaga(service: any, payload: object): any {
    try {
      const response = yield call(service, payload);
      response.data.data = [{"id": 0,
    "category": "All",
}, ...response.data.data]
      yield put(
        eventAction.eventCategoryData(
          'eventCategory',
          response.data,
          actionTypes.GET_EVENT_CATEGORY_DATA,
        ),
      );
    } catch (e: any) {
      console.log('error', e.message);
    }
  }

//for get event Laguage
export function* eventLanguageSaga(service: any, payload: object): any {
    try {
      const response = yield call(service, payload);
      yield put(
        eventAction.eventLanguageData(
          'eventLanguage',
          response.data,
          actionTypes.GET_EVENT_LANGUAGE_DATA,
        ),
      );
    } catch (e: any) {
      console.log('error', e.message);
    }
  }

  //for get all events
export function* eventAllSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.eventAllData(
        'eventAll',
        response.data,
        actionTypes.GET_ALL_EVENTS_DATA,
      ),
    );
  } catch (e: any) {
    
    console.log('error', e.message);
  }
}

//for Add events
export function* addEventSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.addEventData(
        'addEvent',
        response.data,
        actionTypes.ADD_EVENT_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

 //for get  events category wise
 export function* eventByCategorySaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.eventAllData(
        'eventAll',
        response.data,
        actionTypes.GET_ALL_EVENTS_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for get  financial resources
export function* financialResourcesSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.financialResourcesData(
        'financialResources',
        response.data,
        actionTypes.GET_FINACIAL_RESOURCE_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for get financail resource byI d
export function* financialResourceByIdSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.financialResourcesByIdData(
        'financialResource',
        response.data,
        actionTypes.GET_FINACIAL_RESOURCE_BY_ID_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}

//for register event
export function* registerEventSaga(service: any, payload: object): any {
  try {
    const response = yield call(service, payload);
    yield put(
      eventAction.registerEventData(
        'registerEvent',
        response.data,
        actionTypes.REGISTER_EVENT_DATA,
      ),
    );
  } catch (e: any) {
    console.log('error', e.message);
  }
}