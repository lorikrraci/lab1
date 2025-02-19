import axios from 'axios'

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

        // Save user and token in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

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
// Load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/me', config);
  
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response?.data?.message || 'Failed to load user',
      });
    }
  };
  

//Logout user
export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.get('http://localhost:5000/api/v1/auth/logout'); 

        dispatch({
            type: LOGOUT_SUCCESS,
        });

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
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
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}