import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Spinner from "./components/UI/Spinner/Spinner";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() =>
  import("./containers/Checkout/Checkout"),
);

const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    let routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(authCheckState()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
