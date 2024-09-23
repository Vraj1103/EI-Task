// src/behavioral/observer/ConcreteObserverB.ts
import { Observer } from "./Observer";
import logger from "../../utils/Logger";

export class ConcreteObserverB implements Observer {
  private identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
    logger.info(`ConcreteObserverB (${this.identifier}) created.`);
  }

  update(message: string): void {
    console.log(`[${this.identifier}] Logging update: ${message}`);
    logger.info(
      `ConcreteObserverB (${this.identifier}) logged message: ${message}`
    );
    // Additional behavior specific to ConcreteObserverB
    this.logMessage(message);
  }

  private logMessage(message: string): void {
    // Implement specific action, e.g., log the message to a file or database
    console.log(`[${this.identifier}] Logged message: ${message}`);
  }
}
