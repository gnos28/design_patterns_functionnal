type Observer = {
  id: string;
  update(data: unknown): void;
};

const newSubject = () => {
  let observers: Observer[] = [];

  return {
    subscribe: (observer: Observer) => {
      if (!observers.find((item) => item.id === observer.id))
        observers = [...observers, observer];

      return observers;
    },
    unsubscribe: (observer: Observer) =>
      (observers = observers.filter((item) => item.id !== observer.id)),
    notify: (data: unknown) =>
      observers.forEach((observer) => observer.update(data)),
  };
};

const observer: Observer = {
  id: "1",
  update: (data: unknown) => console.log(data),
};

const subject = newSubject();
subject.subscribe(observer);
subject.notify("Hello World");

// Unsubscribe the observer from the subject:
subject.unsubscribe(observer);

export { subject };
