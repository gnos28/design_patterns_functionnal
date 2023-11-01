class MyObject {
  constructor(
    public id: number,
    public dateDebut: Date,
    public dateFin: Date
  ) {}
}

class ValidatedMyObject {
  id: number;
  dateDebut: Date;
  dateFin: Date;

  constructor(myObject: MyObject) {
    const idIntegerPositive =
      Math.floor(myObject.id) === myObject.id && myObject.id > 0;
    const dateDebutBeforeDateFin =
      myObject.dateDebut.getTime() < myObject.dateFin.getTime();

    if (idIntegerPositive && dateDebutBeforeDateFin) {
      this.id = myObject.id;
      this.dateDebut = myObject.dateDebut;
      this.dateFin = myObject.dateFin;
    }
    throw new Error("invalid object");
  }
}

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

    const validatedMyObject = new ValidatedMyObject(myObject);

    adapter.myObjectRepository.create(validatedMyObject);
  };

const createMyObjectUseCaseDemo = createMyObjectUseCase({
  myObjectRepository,
});

createMyObjectUseCaseDemo({
  id: 1,
  dateDebut: new Date(),
  dateFin: new Date(),
});

export { createMyObjectUseCase };
