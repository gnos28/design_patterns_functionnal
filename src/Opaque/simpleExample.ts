import { DeepOpaque } from "./opaque";

type ValidatedInput = DeepOpaque<string>;

const withOpaque = () => {
  const validateInput = (input: string) => input as ValidatedInput;
  const handleValidatedInput = (input: ValidatedInput) => console.log(input);

  handleValidatedInput("hello");

  handleValidatedInput(validateInput("hello"));
};

const withoutOpaque = () => {
  const validateInput = (input: string) => input;
  const handleValidatedInput = (input: string) => console.log(input);

  handleValidatedInput("hello");

  handleValidatedInput(validateInput("hello"));
};
