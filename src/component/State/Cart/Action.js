import { api } from "../../config/api";
import * as actionTypes from "./ActionType";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FIND_CART_REQUEST });
    try {
      const response = await api.get(`/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: actionTypes.FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: actionTypes.FIND_CART_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: actionTypes.GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_CART_ITEMS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addItemToCart = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ADD_ITEM_TO_CART_REQUEST });
    try {
      const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("add item to cart", data);
      dispatch({ type: actionTypes.ADD_ITEM_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.ADD_ITEM_TO_CART_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.put(`/api/cart-item/update`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      console.log("update cart item", data);
      dispatch({ type: actionTypes.UPDATE_CART_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.UPDATE_CART_ITEM_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const removeCartItem = ({ cartItem, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/cart-item/${cartItem.id}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("remove cart item", data);
      dispatch({ type: actionTypes.REMOVE_CART_ITEM_SUCCESS, payload: cartItem.id });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.REMOVE_CART_ITEM_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const clearCartAction = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_CART_REQUEST });
    try {
      const { data } = await api.put(`/api/cart/clear`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: actionTypes.CLEAR_CART_SUCCESS, payload: data });
      console.log("clear cart", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.CLEAR_CART_FAILURE,
        payload: error.message,
      });
    }
  };
};
