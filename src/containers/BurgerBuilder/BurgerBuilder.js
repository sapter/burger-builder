import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";

import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.props.fetchIngredients();
    //   console.log("[BurgerBuilder.js] ComponentDidMount");
    // axios
    //   .get("https://react-my-burger-ef0d2.firebaseio.com/ingredients.json")
    //   .then(response => this.setState({ ingredients: response.data }))
    // .catch(err => this.setState({ error: true }));
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  updatePurchaseState = () => {
    const { ingredients } = this.props;
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

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
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
    }
    return this.props.errorFetching ? (
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
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    errorFetching: state.burgerReducer.error,
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    removeIngredient: ingredientName =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    fetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
