import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Aux from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toggle={this.toggleDrawerHandler}
          authenticated={this.props.authenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          authenticated={this.props.authenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: Boolean(state.authReducer.token),
  };
};

export default connect(mapStateToProps)(Layout);
