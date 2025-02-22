import axios from 'axios';

import { ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS 

} from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0, sort = 'id-asc') => async(dispatch) => {
    try {
      dispatch({type: ALL_PRODUCTS_REQUEST});
  
      let link = `http://localhost:5000/api/v1/products/?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
  
      if (keyword) link += `&keyword=${keyword}`;
      if (category && category !== '') link += `&category=${encodeURIComponent(category)}`;
      if (rating > 0) link += `&ratings[gte]=${rating}`; // Only include if rating > 0
      if (sort) link += `&sort=${sort}`;  // Added sorting

  
      const { data }  = await axios.get(link);
      console.log("API Response:", data);
      
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data
      });
      
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message
      });
    }
};
  

export const getProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const{ data } = await axios.get(`http://localhost:5000/api/v1/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}