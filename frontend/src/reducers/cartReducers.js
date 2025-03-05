const initialState = {
  cartItems: [],
  userId: null,
  shippingInfo: {
    address: "",
    city: "",
    postalCode: "",
    phoneNo: "",
    country: "",
  },
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case "UPDATE_CART_ITEM_QUANTITY": {
      const { product, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === product ? { ...item, quantity } : item
        ),
      };
    }
    case "REMOVE_ITEM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [], // Reset cartItems to empty array
      };
    default:
      return state;
  }
};
