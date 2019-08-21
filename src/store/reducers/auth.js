import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        // authData: action.authData,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.err };
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    case actionTypes.LOGOUT:
      return { ...state, token: null, userId: null };
    default:
      return { ...state };
  }
};

export default authReducer;
