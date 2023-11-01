type Strategy = {
  execute: <A extends unknown[]>(data: A) => A[number];
};

const lastElementStrategy: Strategy = {
  execute: (data) => data[data.length - 1],
};

const data = [1, 2, 3, 4, 5];

const last = lastElementStrategy.execute(data);

export { last };
