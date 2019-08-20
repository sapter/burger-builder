import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
      },
      password: {
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
        },
      },
    },
    isSignUp: true,
  };

  inputChangeHandler = (event, name) => {
    this.setState({
      authForm: {
        ...this.state.authForm,
        [name]: {
          ...this.state.authForm[name],
          value: event.target.value,
        },
      },
    });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.getAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp,
    );
  };

  render() {
    const { authForm } = this.state;
    const formData = Object.keys(authForm)
      .map(elName => ({ ...authForm[elName], elName }))
      .map(formEl => (
        <Input
          key={formEl.elName}
          {...formEl}
          value={formEl.value}
          inputChangeHandler={event =>
            this.inputChangeHandler(event, formEl.elName)
          }
        />
      ));
    if (this.props.loading) return <Spinner />;
    else if (this.props.building && this.props.isAuthenticated) {
      return <Redirect to="/checkout" />;
    } else {
      return this.props.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <form className={classes.Auth} onSubmit={this.submitHandler}>
          {formData}
          <Button btnType="Success">SUBMIT</Button>
          <Button click={this.switchAuthModeHandler} btnType="Danger">
            SWITCH TO
            {this.state.isSignUp ? " SIGN IN" : " SIGN UP"}
          </Button>
          {this.props.error ? <p>{this.props.error.message}</p> : null}
        </form>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authData: state.authReducer.authData,
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null,
    building: state.burgerReducer.building,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuth: (email, password, isSignUp) =>
      dispatch(actions.authFetch(email, password, isSignUp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
