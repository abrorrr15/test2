// Reducer.js
// import * as actionTypes from "./ActionTypes";
// import * as actionTypes from './ActionTypes'; // Faylni to'g'ri manzilda import qiling
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, 
  GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, GET_USERS_ORDERS_FAILURE,
  GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_NOTIFICATION_FAILURE } 
  from '../Order/ActionType';

const initialState = {
  loading: false,
  orders: [],
  notifications: [],
  error: null,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Request cases
    case CREATE_ORDER_REQUEST:
    case GET_USERS_ORDERS_REQUEST:
    case GET_USERS_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success cases
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, payload],
      };

    case GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };

    case GET_USERS_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: payload,
      };

    // Failure cases
    case CREATE_ORDER_FAILURE:
    case GET_USERS_ORDERS_FAILURE:
    case GET_USERS_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // Default case
    default:
      return state;
  }
};
export default orderReducer;