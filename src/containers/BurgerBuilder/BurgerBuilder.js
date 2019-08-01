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
    const order = {
      ingredients: this.state.ingredients,
      price: Number(this.state.totalPrice.toFixed(2)),
      customer: {
        name: "Sam Apter",
        address: {
          street: "123 Anystreet St",
          zipCode: "10002",
          country: "USA",
        },
        email: "sam@anyisp.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: true });
      })
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false, purchasing: false });
        }, 2000);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.error(error);
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
