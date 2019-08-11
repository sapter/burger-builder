import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";

import * as actions from "../../store/actions";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  // componentDidMount() {
  //   console.log("[BurgerBuilder.js] ComponentDidMount");
  //   axios
  //     .get("https://react-my-burger-ef0d2.firebaseio.com/ingredients.json")
  //     .then(response => this.setState({ ingredients: response.data }))
  //     .catch(err => this.setState({ error: true }));
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const { ingredients } = this.state;
    // const params = [];
    // for (let key in ingredients) {
    //   params.push(
    //     encodeURIComponent(key) + "=" + encodeURIComponent(ingredients[key]),
    //   );
    // }
    // params.push(`price=${this.state.totalPrice}`);
    // const paramsString = params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      // search: `?${paramsString}`,
      // state: this.state.ingredients,
    });
  };

  updatePurchaseState = () => {
    const { ingredients } = this.props;
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  // addIngredientHandler = async type => {
  //   const { totalPrice } = this.props;
  //   const newPrice = totalPrice + INGREDIENT_PRICES[type];
  //   await this.props.addIngredient(type, newPrice);
  //   this.updatePurchaseState(this.props.ingredients);
  //   const currentCount = ingredients[type];
  //   const updatedCount = currentCount + 1;
  //   const updatedIngredients = { ...ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  // };

  // removeIngredientHandler = async type => {
  //   const { totalPrice } = this.props;
  //   const newPrice = totalPrice - INGREDIENT_PRICES[type];
  //   await this.props.removeIngredient(type, newPrice);
  //   this.updatePurchaseState(this.props.ingredients);
  //   const currentCount = ingredients[type];
  //   if (currentCount <= 0) return;
  //   const updatedCount = currentCount - 1;
  //   const updatedIngredients = { ...ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const newPrice = totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  // };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary,
      burger = null;
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientSubtracted={this.props.removeIngredient}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState()}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch({ type: actions.ADD_INGREDIENT, ingredientName }),
    removeIngredient: ingredientName =>
      dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
