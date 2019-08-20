import React from "react";

import Aux from "../../../hoc//Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .filter(igKey => props.ingredients[igKey] > 0)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>
            {igKey}: {props.ingredients[igKey]}
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
        <strong>Total price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button click={props.purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button click={props.purchaseContinued} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
