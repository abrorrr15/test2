// Reducer.js

import { LOGOUT } from "../Authentication/ActionType"; 
import * as actionTypes from './ActionTypes'; // Mahalliy ActionType fayli

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  success: null, // Success state qo'shildi
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.ADD_ITEM_TO_CART_REQUEST:
    case actionTypes.UPDATE_CART_ITEM_REQUEST:
    case actionTypes.REMOVE_CART_ITEM_REQUEST:
    case actionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success actions
    case actionTypes.FIND_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        cartItems: action.payload.items || [], // items mavjud bo'lsa, uni oling
        loading: false,
      };

    case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };

    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload], // Yangi item qo'shish
        loading: false,
      };

    case actionTypes.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item // Update item
        ),
        loading: false,
      };

    case actionTypes.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload // Remove item
        ),
        loading: false,
      };

    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: null,
        cartItems: [],
        loading: false,
      };

    // Failure actions
    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
    case actionTypes.ADD_ITEM_TO_CART_FAILURE:
    case actionTypes.UPDATE_CART_ITEM_FAILURE:
    case actionTypes.REMOVE_CART_ITEM_FAILURE:
    case actionTypes.CLEAR_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // Logout action
    case LOGOUT:
      localStorage.removeItem("jwt"); // JWT tokenni localStorage'dan olib tashlash
      return {
        ...state,
        cartItems: [], // Cartni bo'shatish
        cart: null, // Cartni bo'shatish
        success: "Logout success", // Success message qo'shish
      };

    // Default case
    default:
      return state;
  }
};

export default cartReducer;



// // Reducers.js

// import { LOGOUT } from "../../Authentication/ActionType";
// import * as actionTypes from "./ActionTypes";

// const initialState = {
//   cart: null,
//   cartItems: [],
//   loading: false,
//   error: null,
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.FIND_CART_REQUEST:
//     case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
//     case actionTypes.ADD_ITEM_TO_CART_REQUEST:
//     case actionTypes.UPDATE_CART_ITEM_REQUEST:
//     case actionTypes.REMOVE_CART_ITEM_REQUEST:
//     case actionTypes.CLEAR_CART_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case actionTypes.FIND_CART_SUCCESS:
//     case actionTypes.CLEAR_CART_SUCCESS:
//       return {
//         ...state,
//         cart: action.payload,
//         loading: false,
//         cartItems:action.payload.items,
//       };

//     case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
//       return {
//         ...state,
//         cartItems: action.payload,
//         loading: false,
//       };

//     case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
//       return {
//         ...state,
//         cartItems: [...state.cartItems, action.payload],
//         loading: false,
//       };

//     case actionTypes.UPDATE_CART_ITEM_SUCCESS:
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item.id === action.payload.id ? action.payload : item
//         ),
//         loading: false,
//       };

//     case actionTypes.REMOVE_CART_ITEM_SUCCESS:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter(
//           (item) => item.id !== action.payload
//         ),
//         loading: false,
//       };

  

//     case actionTypes.FIND_CART_FAILURE:
//     case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
//     case actionTypes.ADD_ITEM_TO_CART_FAILURE:
//     case actionTypes.UPDATE_CART_ITEM_FAILURE:
//     case actionTypes.REMOVE_CART_ITEM_FAILURE:
//     case actionTypes.CLEAR_CART_FAILURE:
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };

//     case LOGOUT:
//         localStorage.removeItem("jwt");
//       return {...state,cartItems:[],cart:null,success:"Login success"};

//     default:
//       return state;
//   }
// };

// export default cartReducer;
