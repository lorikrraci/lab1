import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/products/${id}`);

        if (!data.product) throw new Error("Product data is missing");

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product.id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images?.[0]?.url || "",
                stock: data.product.stock,
                quantity,
            },
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

// Action to remove item from cart
export const removeItemFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
};
