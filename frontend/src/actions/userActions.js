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
  //Login
export const login = (email, password) => async (dispatch )=>{
    try{

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', {email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
// Register user
// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Use the axios instance for consistent baseURL
        const response = await axiosInstance.post('http://localhost:5000/api/v1/auth/register', userData, config);

        // Ensure response and data exist
        if (response && response.data) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: response.data.user,
            });
        } else {
            throw new Error('Invalid response from the server');
        }
    } catch (error) {
        // Handle cases where error.response might not exist
        const errorMessage = error.response?.data?.message || 'An error occurred during registration';
        
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: errorMessage,
        });
    }
};
//Clear errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}