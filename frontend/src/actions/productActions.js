import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

const BASE_URL = "http://localhost:5000/api/v1";

export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [1, 1000],
    category = "",
    rating = 0,
    sort = "id-asc",
    fetchAll = false
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `${BASE_URL}/products/?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

      if (fetchAll) link += "&all=true";
      if (keyword) link += `&keyword=${keyword}`;
      if (category && category !== "")
        link += `&category=${encodeURIComponent(category)}`;
      if (rating > 0) link += `&rating=${rating}`;
      if (sort) link += `&sort=${sort}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response?.data?.message || "Failed to fetch products",
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || "Failed to fetch product details",
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Creating product:", productData);
    const { data } = await axios.post(
      `${BASE_URL}/admin/products/new`,
      productData,
      config
    );
    console.log("Create response:", data);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.error("Create error:", error.response?.data || error.message);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    console.log("Updating product:", id, productData);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Sending PUT request to:", `${BASE_URL}/admin/products/${id}`);
    const { data } = await axios.put(
      `${BASE_URL}/admin/products/${id}`,
      productData,
      config
    );
    console.log("Update response:", data);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to update product",
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    console.log("Deleting product:", id);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(
      "Sending DELETE request to:",
      `${BASE_URL}/admin/products/${id}`
    );
    await axios.delete(`${BASE_URL}/admin/products/${id}`, config);
    console.log("Delete successful");

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
