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
} from "../constants/userConstants";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    // Save user and token in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { name, email, password } = userData;
    const errors = {};

    // Validation for name: Must start with an uppercase letter
    if (!name || !/^[A-Z][a-zA-Z]*$/.test(name)) {
      errors.name =
        "Name must start with an uppercase letter and contain only letters (e.g., John)";
    }

    // Validation for email: Must contain @gmail.com, @hotmail.com, or @yahoo.com
    const validEmailDomains = ["@gmail.com", "@hotmail.com", "@yahoo.com"];
    if (
      !email ||
      !validEmailDomains.some((domain) => email.toLowerCase().endsWith(domain))
    ) {
      errors.email =
        "Email must end with @gmail.com, @hotmail.com, or @yahoo.com";
    }

    // Validation for password: Minimum 8 characters
    if (!password || password.length < 8) {
      errors.password =
        "Password must be at least 8 characters long and can include letters, numbers, and symbols";
    }

    // If there are any errors, dispatch them and stop
    if (Object.keys(errors).length > 0) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: errors, // Send field-specific errors
      });
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/auth/register",
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const errorMessage =
      error.response?.data?.errMesage ||
      error.response?.data?.message ||
      "Registration failed";
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: { general: errorMessage }, // API errors as a general message
    });
  }
};
// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/v1/auth/me",
      config
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("http://localhost:5000/api/v1/auth/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

// // load user
// export const loadUser = () => async (dispatch) => {
//     try {
//         const { data } = await axios.get('/api/v1/me');

//         dispatch({
//             type: USER_LOADED,
//             payload: data.user,
//         });
//     } catch (error) {
//         console.error('Error loading user:', error);
//     }
// };

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
