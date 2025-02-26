import { ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS 

} from '../constants/productConstants'

export const productReducer = (state = { products:[] },action) =>{
switch(action.type) {
    case ALL_PRODUCTS_REQUEST:
        return{
            loading: true,
            products:[]
        }

    case ALL_PRODUCTS_SUCCESS:
        console.log("Reducer Payload:", action.payload); 
        return{
            loading: false,
            products: action.payload.products,
            productCount: action.payload.totalProducts, 
            resPerPage: action.payload.resPerPage, 
            totalPages: action.payload.totalPages,
            // currentPage: action.payload.currentPage
            // filteredProcutsCount: action.payload.filteredProcutsCount
        }
    case ALL_PRODUCTS_FAIL:
        return{
            loading: false,
            error: action.payload
        }

    case CLEAR_ERRORS :
        return {
            ...state,
            error: null
        }

    default:
        return state;
}
} 

export const productDetailsReducer = (state = { product: {} }, action) => {
switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
        return {
            ...state,
            loading: true
        };
    case PRODUCT_DETAILS_SUCCESS:
        return {
            loading: false,
            product: action.payload
        };
    case PRODUCT_DETAILS_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    case CLEAR_ERRORS:
        return {
            ...state,
            error: null
        };
    default:
        return state;
}
};
