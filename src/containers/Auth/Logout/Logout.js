import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/index";

class Logout extends Component {
  render() {
    this.props.logout();
    return <Redirect to="/" />;
  }
}

const mapdispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  null,
  mapdispatchToProps,
)(Logout);
