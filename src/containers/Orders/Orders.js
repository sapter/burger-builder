import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    error: false,
    errorMessage: null,
  };

  async componentDidMount() {
    try {
      const res = await axios.get("/orders.json");
      this.setState({ orders: res.data, loading: false });
    } catch (err) {
      await this.setState({ error: true, errorMessage: err, loading: false });
      console.dir(err);
    }

    //   .then(response => {
    //         console.log(response)
    //       this.setState({ orders: response.data, loading: false }),
    //   }
    //   )
    //   .catch(err =>
    //     this.setState({ error: true, errorMessage: err, loading: false }),
    //   );
  }

  render() {
    if (this.state.orders) console.dir(Object.keys(this.state.orders));
    const orders = this.state.orders
      ? Object.keys(this.state.orders).map(key => {
          return <Order key={key} id={key} info={this.state.orders[key]} />;
        })
      : null;
    if (this.state.error) return <p>ERROR Occurred</p>;
    else return this.state.loading ? <Spinner /> : <div>{orders}</div>;
  }
}

export default Orders;
