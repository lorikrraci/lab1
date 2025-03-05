import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// Add Item to Cart or Update Quantity
export const addItemToCart =
  (id, quantityChange) => async (dispatch, getState) => {
    try {
      const { cartItems } = getState().cart;
      const existingItem = cartItems.find((item) => item.product === id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityChange;
        if (newQuantity <= 0) {
          dispatch(removeItemFromCart(id));
        } else if (newQuantity <= existingItem.stock) {
          dispatch({
            type: "UPDATE_CART_ITEM_QUANTITY",
            payload: {
              product: id,
              quantity: newQuantity,
            },
          });
        }
      } else if (quantityChange > 0) {
        const { data } = await axios.get(`${BASE_URL}/products/${id}`);
        const product = data.product;

        dispatch({
          type: "ADD_TO_CART",
          payload: {
            product: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            stock: product.stock,
            quantity: quantityChange,
          },
        });
      }

      const { cartItems: updatedCartItems, userId } = getState().cart;
      if (userId) {
        localStorage.setItem(
          `cartItems_${userId}`,
          JSON.stringify(updatedCartItems)
        );
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }
  };

// Remove Item from Cart
export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_ITEM_CART",
    payload: id,
  });

  const { cartItems, userId } = getState().cart;
  if (userId) {
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
  }
};

// Save Shipping Info
export const saveShippingInfo = (data) => (dispatch, getState) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });

  const { userId } = getState().cart;
  if (userId) {
    localStorage.setItem(`shippingInfo_${userId}`, JSON.stringify(data));
  }
};

// Clear Cart
export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART",
  });

  const { userId } = getState().cart;
  if (userId) {
    localStorage.removeItem(`cartItems_${userId}`);
  }
};
