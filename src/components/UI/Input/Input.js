import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "textArea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.inputChangeHandler}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          onChange={props.inputChangeHandler}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.inputChangeHandler}
          required={props.validation.required}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label} </label>
      {inputElement}
    </div>
  );
};

export default input;
