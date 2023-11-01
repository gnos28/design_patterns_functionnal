const kObjMetadata = Symbol("metadata");
const kObjTest = Symbol("test");

const obj = {
  foo: "bar",
  [kObjTest]: "aze",
};

const objMetadata = {
  version: 1,
};

Object.defineProperty(obj, kObjMetadata, {
  value: objMetadata,
});

Object.defineProperty(obj, "coucou", {
  value: objMetadata,
});

type ObjWithSymbol = typeof obj & {
  [key: symbol]: typeof objMetadata;
};

type ObjWithCoucou = typeof obj & {
  coucou: typeof objMetadata;
};

const logProperties = (obj: Record<string | symbol, unknown>) => {
  console.log(obj);
  console.log((obj as ObjWithSymbol)[kObjMetadata]);
  console.log(obj[kObjTest]);
  console.log((obj as ObjWithCoucou)["coucou"]);
};

logProperties(obj);

const copyObj = { ...obj };

console.log("--- copyObj ---");

logProperties(copyObj);
