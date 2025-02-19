import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

const initialState = {
    cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
    shippingInfo: localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo")) 
        : {}
};

export const cartReducer = (state = initialState, action) => {
    let updatedState;

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            if (!item.product) {
                console.warn("Trying to add invalid item to cart", item);
                return state;
            }

            const isItemExist = state.cartItems.find(i => i.product === item.product);

            if (isItemExist) {
                updatedState = {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.product === isItemExist.product
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    ),
                };
            } else {
                updatedState = {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

            localStorage.setItem("cartItems", JSON.stringify(updatedState.cartItems));
            return updatedState;

        case REMOVE_ITEM_FROM_CART:
            updatedState = {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload),
            };

            localStorage.setItem("cartItems", JSON.stringify(updatedState.cartItems));
            return updatedState;

        case SAVE_SHIPPING_INFO:
            updatedState = {
                ...state,
                shippingInfo: action.payload,
            };

            localStorage.setItem("shippingInfo", JSON.stringify(updatedState.shippingInfo));
            return updatedState;

        default:
            return state;
    }
};
