import {
  PRODUCT_APPROVE_FAIL,
  PRODUCT_APPROVE_REQUEST,
  PRODUCT_APPROVE_RESET,
  PRODUCT_APPROVE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SOLD_FAIL,
  PRODUCT_SOLD_REQUEST,
  PRODUCT_SOLD_RESET,
  PRODUCT_SOLD_SUCCESS,
} from "../constants/productConstants";

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const productApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_APPROVE_REQUEST:
      return { loading: true, };
    case PRODUCT_APPROVE_SUCCESS:
      return { loading: false, success: true, };
    case PRODUCT_APPROVE_FAIL:
      return { loading: false, error: action.payload, };
    case PRODUCT_APPROVE_RESET:
      return {};
    default:
      return state;
  }
};


export const productSoldReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SOLD_REQUEST:
      return { loading: true, };
    case PRODUCT_SOLD_SUCCESS:
      return { loading: false, success: true, };
    case PRODUCT_SOLD_FAIL:
      return { loading: false, error: action.payload, };
    case PRODUCT_SOLD_RESET:
      return {};
    default:
      return state;
  }
};