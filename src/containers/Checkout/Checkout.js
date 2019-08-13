import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";
import classes from "./Checkout.module.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return this.props.ingredients ? (
      <div className={classes.Checkout}>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerReducer.ingredients,
});

export default connect(
  mapStateToProps,
  null,
)(Checkout);
