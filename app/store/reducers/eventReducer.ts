import createReducer from '../../lib/createReducer';
import { IEventState } from '../../models/reducers/event';
import actionTypes from '../actions/types';

const initialState: IEventState = {
    data: {},
  };

export const eventReducer = createReducer(initialState, {
    //for event cetegories
    [actionTypes.GET_EVENT_CATEGORY](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_EVENT_CATEGORY_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for event Laguage
    [actionTypes.GET_EVENT_LANGUAGE](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_EVENT_LANGUAGE_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for event All
    [actionTypes.GET_ALL_EVENTS](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_ALL_EVENTS_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //Add event
    [actionTypes.ADD_EVENT](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.ADD_EVENT_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for event by Id
    [actionTypes.GET_EVENTS_BY_ID](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_EVENTS_BY_ID_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for categorywise event
    [actionTypes.GET_CATEGORY_EVENTS](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_CATEGORY_EVENTS_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for categorywise event
    [actionTypes.GET_CATEGORY_EVENTS](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_CATEGORY_EVENTS_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for financial resources
    [actionTypes.GET_FINACIAL_RESOURCE](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_FINACIAL_RESOURCE_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for financial resource By Id
    [actionTypes.GET_FINACIAL_RESOURCE_BY_ID](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.GET_FINACIAL_RESOURCE_BY_ID_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },

    //for register event
    [actionTypes.REGISTER_EVENT](state: IEventState, action: any) {
      return {
        ...state,
      };
    },
    [actionTypes.REGISTER_EVENT_DATA](state: IEventState, action: any) {
      return {
        ...state,
        [action.index]: [action.data],
      };
    },
  });