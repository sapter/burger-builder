import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
  });

  it("should render <buildControls/> when receiving ingredients", () => {
    const ingredients = { salad: 1, cheese: 2, bacon: 3, meat: 1 };
    wrapper.setProps({ ingredients: ingredients });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
