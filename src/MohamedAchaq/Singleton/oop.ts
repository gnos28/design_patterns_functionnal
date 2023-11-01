// Singleton

class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      console.log("create new instance");
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const singleton = Singleton.getInstance();

export { singleton };
