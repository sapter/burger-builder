import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price $<strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          //   subtracted={
          //     props.disabled[control.type]
          //       ? null
          //       : () => props.ingredientSubtracted(control.type)
          //   }
          subtracted={() => props.ingredientSubtracted(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
    </div>
  );
};

export default buildControls;
