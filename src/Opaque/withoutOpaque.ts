type MyObject = {
  id: number;
  dateDebut: Date;
  dateFin: Date;
};

type ValidatedMyObject = {
  id: number;
  dateDebut: Date;
  dateFin: Date;
};

type MyObjectValidator = (myObject: MyObject) => ValidatedMyObject;
const myObjectValidator: MyObjectValidator = (myObject) => {
  const idIntegerPositive =
    Math.floor(myObject.id) === myObject.id && myObject.id > 0;
  const dateDebutBeforeDateFin =
    myObject.dateDebut.getTime() < myObject.dateFin.getTime();

  if (idIntegerPositive && dateDebutBeforeDateFin)
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
    adapter.myObjectRepository.create(myObject);
    adapter.myObjectRepository.create({
      id: -1.5,
      dateDebut: new Date(),
      dateFin: new Date(),
    });

    const validatedMyObject = adapter.myObjectValidator(myObject);

    adapter.myObjectRepository.create(validatedMyObject);
  };

const createMyObjectUseCaseDemo = createMyObjectUseCase({
  myObjectRepository,
  myObjectValidator,
});

createMyObjectUseCaseDemo({
  id: 1,
  dateDebut: new Date(),
  dateFin: new Date(),
});

export { createMyObjectUseCase };
