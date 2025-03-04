import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

import { ADD_TO_CART, CLEAR_CART } from "../constants/cartConstants"; // Import cart constants

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/auth/login`, // Should match /api/v1/auth/login
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    const storedCartItems = localStorage.getItem(`cartItems_${data.user.id}`);
    if (storedCartItems) {
      dispatch({
        type: ADD_TO_CART,
        payload: JSON.parse(storedCartItems),
      });
    }
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};
// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { name, email, password } = userData;
    const errors = {};

    if (!name || !/^[A-Z][a-zA-Z]*$/.test(name)) {
      errors.name =
        "Name must start with an uppercase letter and contain only letters (e.g., John)";
    }

    const validEmailDomains = ["@gmail.com", "@hotmail.com", "@yahoo.com"];
    if (
      !email ||
      !validEmailDomains.some((domain) => email.toLowerCase().endsWith(domain))
    ) {
      errors.email =
        "Email must end with @gmail.com, @hotmail.com, or @yahoo.com";
    }

    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(errors).length > 0) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: errors,
      });
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosInstance.post(
      "/auth/register",
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: { general: errorMessage },
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/auth/me`, config);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });

    const storedCartItems = localStorage.getItem(`cartItems_${data.user.id}`);
    if (storedCartItems) {
      dispatch({
        type: ADD_TO_CART,
        payload: JSON.parse(storedCartItems),
      });
    }
  } catch (error) {
    console.error("Load user error:", error.message);
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch, getState) => {
  try {
    await axiosInstance.get(`${BASE_URL}/auth/logout`);

    const userId = getState().auth.user?.id;
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
      localStorage.removeItem(`shippingInfo_${userId}`);
    }

    dispatch({
      type: LOGOUT_SUCCESS,
    });

    dispatch({ type: CLEAR_CART });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/auth/me/update`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || "Failed to update profile",
    });
  }
};

// Get all users (Admin)
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/auth/admin/users`, config);

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch users",
    });
  }
};

// Update user (Admin)
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosInstance.put(
      `/auth/admin/users/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || "Failed to update user",
    });
  }
};

// Delete user (Admin)
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axiosInstance.delete(`/auth/admin/users/${id}`, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message || "Failed to delete user",
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
