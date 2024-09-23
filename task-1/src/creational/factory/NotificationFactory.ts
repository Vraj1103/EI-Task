// src/creational/factory/NotificationFactory.ts
import { Factory } from "./Factory";

export function notificationFactoryUseCase() {
  try {
    const notificationA = Factory.createProduct("A");
    notificationA.use(); // Using ConcreteProductA

    const notificationB = Factory.createProduct("B");
    notificationB.use(); // Using ConcreteProductB

    const notificationC = Factory.createProduct("C");
    notificationC.use(); // Using ConcreteProductC
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
  }
}
