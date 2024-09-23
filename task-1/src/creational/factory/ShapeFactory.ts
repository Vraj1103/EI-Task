import { Factory } from "./Factory";

export function shapeFactoryUseCase() {
  const productA = Factory.createProduct("A");
  productA.use(); // Using ConcreteProductA

  const productB = Factory.createProduct("B");
  productB.use(); // Using ConcreteProductB
}
