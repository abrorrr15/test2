import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS } from "../Authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
  user: null,  // User state to handle the user details
  favorites: [],  // Initialized favorites as an empty array
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
    case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
    case actionTypes.GET_RESTAURANT_BY_USER_ID_REQUEST:
    case actionTypes.CREATE_RESTAURANT_REQUEST:
    case actionTypes.UPDATE_RESTAURANT_REQUEST:
    case actionTypes.DELETE_RESTAURANT_REQUEST:
    case actionTypes.UPDATE_RESTAURANT_STATUS_REQUEST:
    case actionTypes.CREATE_EVENTS_REQUEST:
    case actionTypes.GET_ALL_EVENTS_REQUEST:
    case actionTypes.DELETE_EVENTS_REQUEST:
    case actionTypes.GET_RESTAURANTS_EVENTS_REQUEST:
    case actionTypes.CREATE_CATEGORY_REQUEST:
    case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        favorites: action.payload.favorites,  // Store user favorites when the user is successfully fetched
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,  // Update the user data with the payload
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,  // Clear user data when the user is deleted
        favorites: [],  // Clear favorites if needed
      };

    case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };

      case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
        console.log("Payload:", action.payload); // Konsolda tekshirish
        return {
          ...state,
          loading: false,
          restaurant: action.payload,
        };
      

    case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };

    case actionTypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
        restaurants: [...state.restaurants, action.payload],  // Add new restaurant to the restaurants list
      };

    case actionTypes.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };

    case actionTypes.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter((item) => item.id !== action.payload),
        usersRestaurant: state.usersRestaurant.filter((item) => item.id !== action.payload),
      };

    case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id
            ? { ...restaurant, status: action.payload.status }
            : restaurant
        ),
      };

    case actionTypes.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };

    case actionTypes.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };

    case actionTypes.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
      };

    case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
    case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
    case actionTypes.GET_RESTAURANT_BY_USER_ID_FAILURE:
    case actionTypes.CREATE_RESTAURANT_FAILURE:
    case actionTypes.UPDATE_RESTAURANT_FAILURE:
    case actionTypes.DELETE_RESTAURANT_FAILURE:
    case actionTypes.UPDATE_RESTAURANT_STATUS_FAILURE:
    case actionTypes.CREATE_EVENTS_FAILURE:
    case actionTypes.GET_ALL_EVENTS_FAILURE:
    case actionTypes.DELETE_EVENTS_FAILURE:
    case actionTypes.GET_RESTAURANTS_EVENTS_FAILURE:
    case actionTypes.CREATE_CATEGORY_FAILURE:
    case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;
