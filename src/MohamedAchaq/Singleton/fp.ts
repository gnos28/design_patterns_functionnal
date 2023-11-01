let instanceCreated = false;

const singleton = () => {
  let heavyWorkResult: undefined | string = undefined;

  if (!instanceCreated) {
    console.log("create new instance");
    heavyWorkResult = "result of heavy calculation";
    instanceCreated = true;
  }

  return heavyWorkResult;
};

export { singleton };

// ***************************************************

const myObject = {
  intercept: 1,
  slope: 2,
  y: (x: number) => x * myObject.slope + myObject.intercept,
};

console.log(myObject.y(1)); // (1 * 2) + 1 = 3
console.log(myObject.y(2)); // (2 * 2) + 1 = 5

myObject.intercept = 3;
myObject.slope = 4;
console.log(myObject.y(1)); // (1 * 4) + 3 = 7
console.log(myObject.y(2)); // (2 * 4) + 3 = 11
