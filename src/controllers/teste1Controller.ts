abstract class Base {
  abstract getName(): string;
  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Pessoa {
  constructor() {
    this.lozin = "";
  }

  getName(): string {
    return "";
  }

  lozin: string;
}

const ff: Pessoa = new Pessoa();
console.log(ff);
