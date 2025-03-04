import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      if (!item.product) {
        console.warn("Trying to add invalid item to cart", item);
        return state;
      }

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
