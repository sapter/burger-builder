import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" click={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
