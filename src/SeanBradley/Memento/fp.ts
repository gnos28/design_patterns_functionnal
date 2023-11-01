type Memento = {
  state: string;
};

type Originator = () => {
  getState: () => string;
  setState: (value: string) => void;
  getMemento: () => Memento;
  setMemento: (value: Memento) => Memento;
};

const newOriginator: Originator = () => {
  let state = "";
  const memento: Memento = {
    state: "",
  };

  const getState = () => state;
  const setState = (value: string) => {
    console.log(`Originator: Set state to '${value}'`);
    state = value;
  };

  const getMemento = () => {
    console.log("Originator: Providing Memento of state to caretaker.");

    const memento: Memento = { state };

    return memento;
  };

  const setMemento = (value: Memento) => {
    state = value.state;
    console.log(`Originator: State after restoring from Memento: '${state}'`);
    return memento;
  };

  return {
    getState,
    setState,
    getMemento,
    setMemento,
  };
};

const newCareTaker = (originator: ReturnType<Originator>) => {
  let mementos: Memento[] = [];

  const create = () => {
    mementos = [...mementos, originator.getMemento()];
  };
  const restore = (index: number) => {
    if (index < mementos.length) originator.setMemento(mementos[index]);
  };

  return { create, restore };
};

const originator = newOriginator();
const careTaker = newCareTaker(originator);

originator.setState("State #1");
originator.setState("State #2");

careTaker.create();

originator.setState("State #3");

careTaker.create();

originator.setState("State #4");

console.log(originator.getState());

careTaker.restore(0);

console.log(originator.getState());

careTaker.restore(1);

console.log(originator.getState());
