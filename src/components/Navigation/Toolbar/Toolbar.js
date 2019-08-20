import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggle} />
    <Logo />
    <nav className={classes.DesktopOnly}>
      <NavigationItems authenticated={props.authenticated} />
    </nav>
  </header>
);

export default toolbar;
