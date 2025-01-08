import {api} from "../../config/api";
import * as actionTypes from "./ActionType";


export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post("api/admin/food", menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created menu: ", data);
      dispatch({ type: actionTypes.CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error: ", error);
      dispatch({
        type: actionTypes.CREATE_MENU_ITEM_FAILURE,
        payload: error.response?.data || error.message,
      });
    }
  };
};

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      const foodCategoryParam = reqData.food_category ? `&food_category=${reqData.food_category}` : '';
      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}${foodCategoryParam}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu items by restaurants: ", data);
      dispatch({
        type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Error fetching menu items: ", error);
      dispatch({
        type: actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error.response?.data || error.message,
      });
    }
  };
};


export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("search results: ", data);
      dispatch({ type: actionTypes.SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("Error searching menu items: ", error);
      dispatch({
        type: actionTypes.SEARCH_MENU_ITEM_FAILURE,
        payload: error.response?.data || error.message,
      });
    }
  };
};

export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("update menu items availability: ", data);
      dispatch({
        type: actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Error updating menu item availability: ", error);
      dispatch({
        type: actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error.response?.data || error.message,
      });
    }
  };
};

export const deleteFoodAction = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_MENU_ITEM_REQUEST });
    try {
      await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("deleted food with ID: ", foodId);
      dispatch({ type: actionTypes.DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (error) {
      console.log("Error deleting food item: ", error);
      dispatch({
        type: actionTypes.DELETE_MENU_ITEM_FAILURE,
        payload: error.response?.data || error.message,
      });
    }
  };
};
