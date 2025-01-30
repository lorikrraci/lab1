import axios from 'axios';

import { ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS 

} from '../constants/productConstants'

export const getProducts = (keyword = '' ,currentPage = 1, price, category, rating = 0) => async(dispatch) => {
    try {

        dispatch({type: ALL_PRODUCTS_REQUEST})

        let link = `http://localhost:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&category=${category}`

                // let link = `http://localhost:5000/api/v1/products`

        if(category) {
            link += `&category=${category}`;
                        // link = `http://localhost:5000/api/v1/products`
        }

        const { data }  = await axios.get(link);

        console.log('response', data)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        console.log('error', error)
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


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