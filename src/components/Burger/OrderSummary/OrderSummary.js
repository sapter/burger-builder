import React, { Component } from "react";
import Aux from "../../../hoc//Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary.js] componentDidUpdate");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .filter(igKey => this.props.ingredients[igKey] > 0)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>
              {igKey}: {this.props.ingredients[igKey]}
            </span>
            :
          </li>
        );
      });
    return (
      <Aux>
        <h3>Your Order </h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button click={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button click={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
