import * as actionsTypes from "./actionsTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionsTypes.PURCHASE_BURGER_SUCCESS,
  id,
  orderData,
});
const purchaseBurgerFail = error => ({
  type: actionsTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = (orderData, token) => {
  return dispatch => {
    dispatch(setLoading());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
const setLoading = () => ({ type: actionsTypes.FETCH_ORDERS_START });

const fetchOrdersSuccess = orders => ({
  type: actionsTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

const fetchOrdersFailed = error => ({
  type: actionsTypes.FETCH_ORDERS_FAILED,
  error,
});

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(setLoading);
    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => dispatch(fetchOrdersSuccess(res.data)))
      .catch(err => dispatch(fetchOrdersFailed(err)));
  };
};
