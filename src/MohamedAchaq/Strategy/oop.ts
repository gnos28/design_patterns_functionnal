interface Strategy {
  execute(data: unknown): unknown;
}

class LastElementStrategy implements Strategy {
  public execute(data: unknown[]) {
    return data[data.length - 1];
  }
}

const strategy = new LastElementStrategy();
const data = [1, 2, 3, 4, 5];

let last = strategy.execute(data);

export { last };
