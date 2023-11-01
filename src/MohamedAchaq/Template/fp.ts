type PizzaProps = {
  addToppings?: () => void;
};

const pizzaTemplate = (props?: PizzaProps) => {
  const placeholder = () => {};

  const prepareDough = () => {
    console.log("Preparing dough");
  };

  const addTomatoSauce = () => {
    console.log("Adding tomato sauce");
  };

  const addCheese = () => {
    console.log("Adding cheese");
  };

  const bakePizza = () => {
    console.log("Baking pizza");
  };

  return {
    makePizza: () => {
      prepareDough();
      addTomatoSauce();
      addCheese();
      props && props.addToppings ? props.addToppings() : placeholder();
      bakePizza();
    },
  };
};

const pepperoniPizza = pizzaTemplate({
  addToppings: () => console.log("Adding pepperoni"),
});

const vegetarianPizza = pizzaTemplate({
  addToppings: () => console.log("Adding vegetables"),
});

pepperoniPizza.makePizza();
vegetarianPizza.makePizza();
