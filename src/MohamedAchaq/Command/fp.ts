type Command = {
  execute(): void;
};
type Receiver = {
  action: () => void;
};

const receiver: Receiver = {
  action: () => {
    console.log("Action called");
  },
};

const newConcreteCommand: (receiver: Receiver) => Command = () => ({
  execute: () => receiver.action(),
});

const command = newConcreteCommand(receiver);

command.execute();

export { command };
