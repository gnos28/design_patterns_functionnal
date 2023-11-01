type Visitor = () => {
  visit: (part: Part) => void;
};

type Part = {
  name: string;
  value: number;
  parts: Set<Part>;
  accept: (visitor: Visitor) => void;
};

const newPart = (name: string, value: number, parent?: Part): Part => {
  const parts = new Set<Part>();
  const thisPart: Part = {
    name,
    value,
    parts,
    accept: (visitor: Visitor) => {
      parts.forEach((part) => part.accept(visitor));
      visitor().visit(thisPart);
    },
  };

  if (parent) {
    parent.parts.add(thisPart);
  }

  return thisPart;
};

const Part_A = newPart("A", 101);
const Part_B = newPart("B", 305, Part_A);
const Part_C = newPart("C", 185, Part_A);
const Part_D = newPart("D", -30, Part_B);

const printPartNamesVisitor: Visitor = () => ({
  visit: (part: Part) => {
    console.log(part.name);
  },
});

Part_A.accept(printPartNamesVisitor);

let totalValue = 0;

const calculatePartTotalsVisitor: Visitor = () => ({
  visit: (part: Part) => (totalValue += part.value),
});

Part_A.accept(calculatePartTotalsVisitor);

console.log(totalValue);
