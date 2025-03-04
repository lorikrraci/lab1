import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`
    );

    if (!data.product) throw new Error("Product data is missing");

    const imageUrl =
      data.product.images && data.product.images.length > 0
        ? data.product.images[0].url
        : "/images/default-product.png";

    const item = {
      product: data.product.id,
      name: data.product.name,
      price: data.product.price,
      image: imageUrl,
      stock: data.product.stock,
      quantity,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });

    const userId = getState().auth.user?.id;
    const updatedCartItems = getState().cart.cartItems;
    if (userId) {
      localStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(updatedCartItems)
      );
    }
    console.log("Cart items after adding:", updatedCartItems); // Debug log
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });

  const userId = getState().auth.user?.id;
  if (userId) {
    localStorage.setItem(
      `cartItems_${userId}`,
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const saveShippingInfo = (data) => (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  const userId = getState().auth.user?.id;
  if (userId) {
    localStorage.setItem(`shippingInfo_${userId}`, JSON.stringify(data));
  }
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
