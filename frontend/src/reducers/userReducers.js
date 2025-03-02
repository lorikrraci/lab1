// userReducers.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  errors: {}, // Changed from error to errors (object)
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: {}, // Clear errors on new request
      };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        errors: action.payload, // Store field-specific errors
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}, // Clear all errors
      };

    default:
      return state;
  }
};
