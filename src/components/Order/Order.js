import React from "react";
import classes from "./Order.module.css";

const order = props => {
  console.log(props);
  return (
    <div className={classes.Order}>
      <h4>{`Order number: ${props.id}`}</h4>
      <p>
        Ingredients:
        <ul>
          {Object.keys(props.info.ingredients).map(ingredient => (
            <li key={ingredient}>
              {`${ingredient}: (${props.info.ingredients[ingredient]})`}
            </li>
          ))}
        </ul>
      </p>
      <p>
        <strong>{`Price: ${props.info.price.toFixed(2)}`}</strong>
      </p>
    </div>
  );
};

export default order;
