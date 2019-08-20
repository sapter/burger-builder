import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  orders: {},
  fetchedOrders: null,
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.id]: { ...action.orderData },
        },
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.orders,
        },
        fetchedOrders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
