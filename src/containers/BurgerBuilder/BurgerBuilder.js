import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";

import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get("https://react-my-burger-ef0d2.firebaseio.com/ingredients.json")
      .then(response => this.setState({ ingredients: response.data }))
      .catch(err => this.setState({ error: true }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { ingredients } = this.state;
    const params = [];
    for (let key in ingredients) {
      params.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(ingredients[key]),
      );
    }
    params.push(`price=${this.state.totalPrice}`);
    const paramsString = params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${paramsString}`,
      state: this.state.ingredients,
    });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const currentCount = ingredients[type];
    const updatedCount = currentCount + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const currentCount = ingredients[type];
    if (currentCount <= 0) return;
    const updatedCount = currentCount - 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary,
      burger = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientSubtracted={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            setPurchasing={this.purchaseHandler}
          />
        </Aux>
      );
    }
    return this.state.error ? (
      <p>Error: Can't fetch ingredients</p>
    ) : (
      <Aux>
        <Modal
          show={this.state.purchasing}
          purchaseCancelled={this.purchaseCancelHandler}
        >
          {this.state.loading ? <Spinner /> : orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
