import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

const axiosInstance =  axios.create({
    baseURL: 'http://localhost:5000',  // Set the base URL for your API
    timeout: 10000,  // Optional: Set a timeout (in ms) for requests
    headers: {
      'Content-Type': 'application/json',  // Optional: Default headers
    },
  });