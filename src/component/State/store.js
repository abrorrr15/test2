import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Correct thunk import
import authReducer, { userReducer } from "./Authentication/Reducer";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant_Order/Reducer";
import ingredientReducer from "./Ingredients/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: restaurantsOrderReducer,
  ingredients: ingredientReducer,
});

const middleware = [thunk];

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
