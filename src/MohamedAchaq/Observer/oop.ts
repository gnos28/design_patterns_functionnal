interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  public subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer) {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  public notify(data: any) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class ConcreteObserver implements Observer {
  public update(data: any) {
    console.log(data);
  }
}

const subject = new Subject();
const observer = new ConcreteObserver();
subject.subscribe(observer);
subject.notify("Hello World");

// Unsubscribe the observer from the subject:
subject.unsubscribe(observer);

export { subject };
