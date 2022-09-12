import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    productListReducer,
    productDetailsReducer,
} from "./redux/productReducers.js";
import { cartReducer } from "./redux/cartReducers.js";
import { userLoginReducer,userRegisterReducer,userDetailsReducer } from "./redux/userReducers.js";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer
    
});
// CART STATE
const cartItemsLocal = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
// USER INFO STATE
const userInfofromLocal = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// SET DEFAULT STATES
const initialState = {
    cart: { cartItems: cartItemsLocal },
    userLogin:{userInfo:userInfofromLocal}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
