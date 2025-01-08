import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./Authentication/Reducer"; // Reducer'ni import qilish
import { thunk } from 'redux-thunk';  // Redux-thunk'ni import qilish
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant_Order/Reducer";
import ingredientReducer from "./Ingredients/Reducer";
const rootReducer = combineReducers({
  auth: authReducer,  // Auth reducer
  restaurant:restaurantReducer,
  menu:menuItemReducer,
  cart:cartReducer,
  order:orderReducer,
  restaurantOrder: restaurantsOrderReducer,
  ingredients: ingredientReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
