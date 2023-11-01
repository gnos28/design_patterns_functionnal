type State = {
  toString: () => string;
};

const concreteStateA: State = {
  toString: () => "I am ConcreteStateA",
};

const concreteStateB: State = {
  toString: () => "I am ConcreteStateB",
};

const concreteStateC: State = {
  toString: () => "I am ConcreteStateC",
};

const newContext = () => {
  const stateHandles = [concreteStateA, concreteStateB, concreteStateC];

  const request = () => stateHandles[Math.floor(Math.random() * 3)];

  return { request };
};

const context = newContext();

console.log(context.request());
console.log(context.request());
console.log(context.request());
console.log(context.request());
console.log(context.request());
