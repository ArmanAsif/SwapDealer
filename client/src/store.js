import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  usersReviewReducer,
  addReviewReducer,
  userListReducer,
} from "./reducers/userReducers";
import {
  productCreateReducer,
  productListReducer,
  productDetailsReducer,
  productApproveReducer,
  productSoldReducer,
} from "./reducers/productReducers";


const reducer = combineReducers({
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productApprove: productApproveReducer,
  productSold: productSoldReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addReview: addReviewReducer,
  usersReview: usersReviewReducer,
  userList: userListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
