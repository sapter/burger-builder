import React, { Component } from "react";
import { connect } from "react-redux";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class Orders extends Component {
  componentDidMount() {
    const { token, userId } = this.props;
    this.props.fetchOrders(token, userId);
  }

  render() {
    const orders = this.props.orders
      ? Object.keys(this.props.orders).map(key => {
          return <Order key={key} id={key} info={this.props.orders[key]} />;
        })
      : null;
    return this.props.loading ? <Spinner /> : <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  loading: state.orderReducer.loading,
  token: state.authReducer.token,
  userId: state.authReducer.userId,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) =>
    dispatch(orderActions.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
