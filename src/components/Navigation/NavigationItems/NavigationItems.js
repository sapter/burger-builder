import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem clicked={props.clicked} exact link="/">
      Burger Builder
    </NavigationItem>
    {props.authenticated ? (
      <NavigationItem clicked={props.clicked} link="/orders">
        My Orders
      </NavigationItem>
    ) : null}
    {props.authenticated ? (
      <NavigationItem clicked={props.clicked} link="logout">
        Log Out
      </NavigationItem>
    ) : (
      <NavigationItem clicked={props.clicked} link="/auth">
        Log In
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
