interface Command {
  execute(): void;
}

class ConcreteCommand implements Command {
  constructor(private receiver: Receiver) {}

  public execute() {
    this.receiver.action();
  }
}

class Receiver {
  public action() {
    console.log("Action called");
  }
}

const receiver = new Receiver();
const command = new ConcreteCommand(receiver);
const invoker = new Invoker();
invoker.setCommand(command);
invoker.execute();

export { invoker };
