import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import { CLEAR_CART } from "../constants/cartConstants";

const BASE_URL = "http://localhost:5000/api/v1";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/order/new`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });

    dispatch({ type: CLEAR_CART });
    localStorage.removeItem(`cartItems_${order.userId}`);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to create order",
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/order/me`, config);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/order/${id}`,
      orderData,
      config
    ); // Changed from /status

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    console.error(
      "Update order error:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to update order",
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/order/${id}`, config);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to delete order",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
