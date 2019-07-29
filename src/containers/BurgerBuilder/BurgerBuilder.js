import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
    // this.setState(prevState => {
    //   return { purchasing: !prevState.purchasing };
    // });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => alert("Success");

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
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          purchaseCancelled={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
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
}

export default BurgerBuilder;
