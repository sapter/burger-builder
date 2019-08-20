import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    {props.authenticated ? (
      <NavigationItem link="/orders">My Orders</NavigationItem>
    ) : null}
    {props.authenticated ? (
      <NavigationItem link="logout">Log Out</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Log In</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
