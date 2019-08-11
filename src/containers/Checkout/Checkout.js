import React, { Component } from "react";
import { connect } from "react-redux";

import { Route } from "react-router-dom";
import classes from "./Checkout.module.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };

  // UNSAFE_componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = null;
  //   query.forEach((val, key) => {
  //     if (key === "price") {
  //       price = +val;
  //     } else {
  //       ingredients[key] = +val;
  //     }
  //   });
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
          // render={props => (
          //   <ContactData
          //     ingredients={this.props.ingredients}
          //     price={this.props.totalPrice}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ingredients: state.ingredients });

export default connect(
  mapStateToProps,
  null,
)(Checkout);
