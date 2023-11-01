type Colleague1 = {
  method1: () => string;
};

type Colleague2 = {
  method2: () => "Here is the Colleague2 specific data you asked for";
};

const newMediator = (colleague1: Colleague1, colleague2: Colleague2) => {
  const colleague1Method = () => colleague1.method1();
  const colleague2Method = () => colleague2.method2();

  return { colleague1Method, colleague2Method };
};

const colleague1: Colleague1 = {
  method1: () => "Here is the Colleague1 specific data you asked for",
};

const colleague2: Colleague2 = {
  method2: () => "Here is the Colleague2 specific data you asked for",
};

const mediator = newMediator(colleague1, colleague2);

const data1 = mediator.colleague2Method();
console.log(`COLLEAGUE1 <--> ${data1}`);

const data2 = mediator.colleague1Method();
console.log(`COLLEAGUE2 <--> ${data2}`);
