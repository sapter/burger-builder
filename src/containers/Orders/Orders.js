import React, { Component } from "react";
import { connect } from "react-redux";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorhandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  // async componentDidMount() {
  //   try {
  //     const res = await axios.get("/orders.json");
  //     this.setState({ orders: res.data, loading: false });
  //   } catch (err) {
  //     await this.setState({ error: true, errorMessage: err, loading: false });
  //     console.dir(err);
  //   }
  // }

  render() {
    const orders = this.props.orders
      ? Object.keys(this.props.orders).map(key => {
          return <Order key={key} id={key} info={this.props.orders[key]} />;
        })
      : null;
    if (this.state.error) return <p>ERROR Occurred</p>;
    else return this.props.loading ? <Spinner /> : <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  loading: state.orderReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(orderActions.fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
