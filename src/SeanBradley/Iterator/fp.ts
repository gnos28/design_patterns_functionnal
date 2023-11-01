type IIterator = {
  next: () => Aggregate;
  hasNext: () => boolean;
};

const iteratorConcept = (aggregates: Aggregate[]): IIterator => {
  let index = 0;
  const next = () => {
    if (index >= aggregates.length) throw new Error("At End of Iterator");
    return aggregates[index++];
  };
  const hasNext = () => index < aggregates.length;

  return { next, hasNext };
};

type Aggregate = {
  method: () => void;
};

const newAggregate = (val: number): Aggregate => ({
  method: () => console.log(`method ${val} has been invoked`),
});

const aggregates = [
  newAggregate(1),
  newAggregate(2),
  newAggregate(3),
  newAggregate(4),
];

const iterable = iteratorConcept(aggregates);

const iterator = (iterable: IIterator): void => {
  if (!iterable.hasNext()) return;
  iterable.next().method();
  return iterator(iterable);
};

iterator(iterable);

// while (iterable.hasNext()) iterable.next().method();
