import * as actionTypes from "./ActionType";

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
  search: [], // Qidiruv natijalari uchun
  message: null, // Xabarlar uchun (masalan, muvaffaqiyatli yaratish yoki o‘chirish haqida)
};

const menuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MENU_ITEM_REQUEST:
    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.SEARCH_MENU_ITEM_REQUEST:
    case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
    case actionTypes.DELETE_MENU_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message:null
      };

    case actionTypes.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: [...state.menuItems, action.payload],
        message: "Food created successfully!", // Xabar
      };

    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: action.payload,
      };

    case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload, // Qidiruv natijalari
      };

    case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
        console.log("updated items id", action.payload.id)
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.map(
            (menuItem) => menuItem.id === action.payload.id ? action.payload:menuItem
        ),
        message: "Menu item availability updated successfully!", // Xabar
      };

    case actionTypes.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.filter(
          (item) => item.id !== action.payload
        ),
        message: "Menu item deleted successfully!", // Xabar
      };

    case actionTypes.CREATE_MENU_ITEM_FAILURE:
    case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.SEARCH_MENU_ITEM_FAILURE:
    case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
    case actionTypes.DELETE_MENU_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null, // Xato xabari uchun umumiy xabar
      };

    default:
      return state;
  }
};

export default menuItemReducer;
