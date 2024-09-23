import { Product } from "./Product";

export class ConcreteProductB implements Product {
  use(): void {
    console.log("Using ConcreteProductB");
  }
}
