import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backkdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./SideDrawer.module.css";

const sideDrawer = props => {
  let attachedClasses = `${classes.SideDrawer}`;
  attachedClasses += props.open ? ` ${classes.Open}` : ` ${classes.Close}`;

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            clicked={props.closed}
            authenticated={props.authenticated}
          />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
