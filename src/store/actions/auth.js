import * as actionTypes from "./actionsTypes";
import axios from "axios";

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});
const authFail = err => ({ type: actionTypes.AUTH_FAIL, err });
const setLoading = () => ({ type: actionTypes.SET_LOADING });

export const logout = () => {
  localStorage.clear();
  return { type: actionTypes.LOGOUT };
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      localStorage.clear();
      dispatch(logout());
    }, +expirationTime * 1000);
  };
};

export const authFetch = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(setLoading());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    const apiKey = "AIzaSyCbnZSuByqtAir7t1JpwPUxNVlA0AGS8Ao";
    const url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        apiKey
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        apiKey;
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + Number(res.data.expiresIn * 1000),
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(setLogoutTimer(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    let { token, userId, expirationDate } = localStorage;
    expirationDate = new Date(expirationDate);
    if (!token || expirationDate <= new Date()) dispatch(logout());
    else {
      dispatch(authSuccess(token, userId));
      dispatch(
        setLogoutTimer(
          (expirationDate.getTime() - new Date().getTime()) / 1000,
        ),
      );
    }
  };
};
