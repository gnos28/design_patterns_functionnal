abstract class Pizza {
  public makePizza() {
    this.prepareDough();
    this.addTomatoSauce();
    this.addCheese();
    this.addToppings();
    this.bakePizza();
  }

  protected prepareDough() {
    console.log("Preparing dough");
  }

  protected addTomatoSauce() {
    console.log("Adding tomato sauce");
  }

  protected addCheese() {
    console.log("Adding cheese");
  }

  protected abstract addToppings(): void;

  protected bakePizza() {
    console.log("Baking pizza");
  }
}

class PepperoniPizza extends Pizza {
  protected addToppings() {
    console.log("Adding pepperoni");
  }
}

class VegetarianPizza extends Pizza {
  protected addToppings() {
    console.log("Adding vegetables");
  }
}

const pepperoniPizza = new PepperoniPizza();
pepperoniPizza.makePizza();

const vegetarianPizza = new VegetarianPizza();
vegetarianPizza.makePizza();

export { Pizza };
