import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorhandler";
import * as orderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayName: "Fastest" },
            { value: "cheapest", displayName: "Cheapest" },
          ],
        },
        value: "fastest",
      },
    },
  };

  orderhandler = event => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: Number(this.props.price.toFixed(2)),
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
        deliveryMethod: this.state.orderForm.deliveryMethod.value,
      },
    };
    this.props.onOrderBurger(order);
    setTimeout(() => {
      this.props.history.replace("/");
    }, 300);
  };

  inputChangeHandler = (event, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[id] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[id] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = Object.keys(this.state.orderForm)
      .map(key => Object.create({ id: key, config: this.state.orderForm[key] }))
      .map(element => (
        <Input
          key={element.id}
          {...element.config}
          value={element.config.value}
          inputChangeHandler={event =>
            this.inputChangeHandler(event, element.id)
          }
        />
      ));
    let form = (
      <form onSubmit={this.orderhandler}>
        {formElementsArray}
        <Button btnType="Success">Submit</Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { burgerReducer, orderReducer } = state;
  return {
    ingredients: burgerReducer.ingredients,
    price: burgerReducer.totalPrice,
    loading: orderReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData =>
      dispatch(orderActions.purchaseBurgerStart(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
