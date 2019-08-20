import * as actionTypes from "../actions/actionsTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const burger = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.bacon,
          cheese: action.payload.cheese,
          meat: action.payload.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
        building: false,
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
          building: true,
        };
      } else return state;
    default:
      return state;
  }
};

export default burger;
