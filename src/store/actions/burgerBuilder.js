import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

// action creators
export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName,
});
export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName,
});

const initIngredients = payload => ({
  type: actionTypes.INIT_INGREDIENTS,
  payload,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => dispatch(initIngredients(response.data)))
      .catch(() => dispatch(fetchIngredientsFailed()));
  };
};
