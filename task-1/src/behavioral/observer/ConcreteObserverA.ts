// src/behavioral/observer/ConcreteObserverA.ts
import { Observer } from "./Observer";
import logger from "../../utils/Logger";

export class ConcreteObserverA implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
    logger.info(`ConcreteObserverA (${this.name}) created.`);
  }

  update(message: string): void {
    console.log(`[${this.name}] Received update: ${message}`);
    logger.info(
      `ConcreteObserverA (${this.name}) received message: ${message}`
    );
    // Additional behavior specific to ConcreteObserverA
    this.performAction(message);
  }

  private performAction(message: string): void {
    // Implement specific action, e.g., display the message
    console.log(`[${this.name}] Displaying message: ${message}`);
  }
}
