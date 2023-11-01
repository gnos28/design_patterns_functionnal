abstract class Vehicle {
  abstract getType(): string;
}

class Car extends Vehicle {
  getType() {
    return "car";
  }
}

class Truck extends Vehicle {
  getType() {
    return "truck";
  }
}

class VehicleFactory {
  public createVehicle(type: string): Vehicle {
    switch (type) {
      case "car":
        return new Car();
      case "truck":
        return new Truck();
      default:
        throw new Error(`Vehicle of type ${type} not found`);
    }
  }
}

const factory = new VehicleFactory();
const car = factory.createVehicle("car");
const truck = factory.createVehicle("truck");

export { car, truck };
