import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

const initialState = {
  loading: false,
  order: null,
  orders: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case MY_ORDERS_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };

    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        error: null,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order.id !== action.payload),
        error: null,
      };

    case CREATE_ORDER_FAIL:
    case MY_ORDERS_FAIL:
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
