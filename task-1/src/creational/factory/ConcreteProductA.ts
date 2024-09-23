import { Product } from "./Product";

export class ConcreteProductA implements Product {
  use(): void {
    console.log("Using ConcreteProductA");
  }
}
