type Strategy = () => { method: () => string };

type ObjectContext = () => {
  request: (strategy: Strategy) => ReturnType<Strategy>;
};

const concreteStrategyA: Strategy = () => ({
  method: () => "I am ConcreteStrategyA",
});

const concreteStrategyB: Strategy = () => ({
  method: () => "I am ConcreteStrategyB",
});

const concreteStrategyC: Strategy = () => ({
  method: () => "I am ConcreteStrategyC",
});

const objectContext: ObjectContext = () => ({
  request: (strategy) => strategy(),
});

console.log(objectContext().request(concreteStrategyA).method());
console.log(objectContext().request(concreteStrategyB).method());
console.log(objectContext().request(concreteStrategyC).method());
