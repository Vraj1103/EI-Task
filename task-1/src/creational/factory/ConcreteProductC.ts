import { Product } from "./Product";

export class ConcreteProductC implements Product {
  use(): void {
    console.log("Using ConcreteProductC");
  }
}
