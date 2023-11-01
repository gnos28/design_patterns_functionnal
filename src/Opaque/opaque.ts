type Immutable<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

type DeepReadonlyArray<T> = ReadonlyArray<Immutable<T>> & Record<string, never>;

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: Immutable<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Symbols {
  export declare const base: unique symbol;
  export declare const brand: unique symbol;
}

type Opaque<BaseType, BrandType = unknown> = Immutable<BaseType> & {
  readonly [Symbols.base]: BaseType;
  readonly [Symbols.brand]: BrandType;
};

type DeepOpaqueArray<T> = DeepOpaque<T>[];

type DeepOpaqueObject<T> = {
  readonly [P in keyof T]: DeepOpaque<T[P]>;
};

export type DeepOpaque<T> = T extends (infer R)[]
  ? DeepOpaqueArray<R>
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
  ? T
  : T extends object
  ? DeepOpaqueObject<T>
  : Opaque<T>;

type MyObject = {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  color: {
    red: number;
    green: number;
    blue: number;
  };
  letterList: { value: string }[];
};

type ValidatedMyObject = DeepOpaque<MyObject>;

type MyObjectValidator = (
  myObject: MyObject | ValidatedMyObject
) => ValidatedMyObject;

const myObjectValidator: MyObjectValidator = (myObject) => {
  const idIntegerPositive =
    Math.floor(myObject.id) === myObject.id && myObject.id > 0;
  const dateDebutBeforeDateFin =
    myObject.dateDebut.getTime() < myObject.dateFin.getTime();
  const colorIsBetween0and255 = (color: number) =>
    Math.floor(color) === color && color >= 0 && color <= 255;
  const colorsAreBetween0and255 =
    colorIsBetween0and255(myObject.color.red) &&
    colorIsBetween0and255(myObject.color.green) &&
    colorIsBetween0and255(myObject.color.blue);

  if (idIntegerPositive && dateDebutBeforeDateFin && colorsAreBetween0and255)
    return myObject as ValidatedMyObject;

  throw new Error("invalid object");
};

type MyObjectRepository = {
  create: (myObject: ValidatedMyObject) => void;
};
const myObjectRepository: MyObjectRepository = {
  create: (myObject) => {
    console.log(myObject);
  },
};

type CreateMyObjectPort = {
  myObjectRepository: MyObjectRepository;
  myObjectValidator: MyObjectValidator;
};

type CreateMyObjectUseCase = (
  adapter: CreateMyObjectPort
) => (myObject: MyObject) => void;

const createMyObjectUseCase: CreateMyObjectUseCase =
  (adapter) => (myObject) => {
    const validatedMyObject = adapter.myObjectValidator(myObject);

    // validatedMyObject is now fully immutable
    validatedMyObject.id = -2;
    validatedMyObject.color.red = 1000;
    validatedMyObject.letterList.push({ value: "b" });
    validatedMyObject.letterList = [
      ...validatedMyObject.letterList,
      { value: "d" },
    ];
    validatedMyObject.letterList[0].value;

    const myObjectWithoutType = {
      id: -1.5,
      dateDebut: new Date(),
      dateFin: new Date(),
      color: {
        red: 500,
        green: 500,
        blue: 500,
      },
      letterList: [{ value: "a" }, { value: "b" }, { value: "c" }],
    };

    const updatedValidatedMyObject = { ...validatedMyObject, id: -2 };

    const updated2ValidatedMyObject = {
      ...validatedMyObject,
      letterList: [...validatedMyObject.letterList, { value: "d" }],
    };

    // myObjectRepository only accept type ValidatedMyObject
    adapter.myObjectRepository.create(validatedMyObject);

    // objects sharing the shape of ValidatedMyObject doesn't work !
    adapter.myObjectRepository.create(myObject);
    adapter.myObjectRepository.create(myObjectWithoutType);
    adapter.myObjectRepository.create(updatedValidatedMyObject);
    adapter.myObjectRepository.create(updated2ValidatedMyObject);
  };

const createMyObjectUseCaseDemo = createMyObjectUseCase({
  myObjectRepository,
  myObjectValidator,
});

const goodMyObject: MyObject = {
  id: 1,
  dateDebut: new Date("2023-10-07"),
  dateFin: new Date("2023-10-08"),
  color: {
    red: 255,
    green: 255,
    blue: 255,
  },
  letterList: [{ value: "a" }, { value: "b" }, { value: "c" }],
};

const badMyObject: MyObject = {
  id: -1,
  dateDebut: new Date("2023-10-07"),
  dateFin: new Date("2023-10-07"),
  color: {
    red: 999,
    green: 255,
    blue: 255,
  },
  letterList: [{ value: "a" }, { value: "b" }, { value: "c" }],
};

// OK
createMyObjectUseCaseDemo(goodMyObject);

// Error : invalid object
createMyObjectUseCaseDemo(badMyObject);
