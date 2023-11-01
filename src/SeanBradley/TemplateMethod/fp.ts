type AbstractFunctionProps = {
  stepOne?: () => void;
  stepTwo: () => void;
  stepThree?: () => void;
};

const abstractFunction = (props: AbstractFunctionProps) => {
  const templateMethod = () => {
    props.stepOne ? props.stepOne() : () => {};
    props.stepTwo();
    props.stepThree
      ? props.stepThree()
      : console.log("Step Three is a hook that prints this line by default.");
  };

  return templateMethod;
};

const concreteFunctionA = abstractFunction({
  stepTwo: () => {
    console.log("function_A : Step Two (overridden)");
  },
});

const concreteFunctionB = abstractFunction({
  stepOne: () => {
    console.log("function_B : Step One (overridden)");
  },
  stepTwo: () => {
    console.log("function_B : Step Two. (overridden)");
  },
  stepThree: () => {
    console.log("function_B : Step Three. (overridden)");
  },
});

concreteFunctionA();
concreteFunctionB();
