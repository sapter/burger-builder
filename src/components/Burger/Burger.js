import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  const { ingredients } = props;
  let transormedIngredients = Object.keys(ingredients)
    .map(igKey =>
      [...Array(ingredients[igKey])].map((_, idx) => (
        <BurgerIngredient key={igKey + idx} type={igKey} />
      )),
    )
    .flat();
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transormedIngredients.length ? (
        transormedIngredients
      ) : (
        <p>Please start adding ingredients</p>
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
