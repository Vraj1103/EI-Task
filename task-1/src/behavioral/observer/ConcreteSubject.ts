// src/behavioral/observer/ConcreteSubject.ts
import { Subject } from "./Subject";
import { Observer } from "./Observer";
import logger from "../../utils/Logger";

export class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: string = "";

  attach(observer: Observer): void {
    this.observers.push(observer);
    logger.info("Observer attached.");
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    logger.info("Observer detached.");
  }

  notify(): void {
    logger.info("Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  setState(state: string): void {
    this.state = state;
    logger.info(`Subject state changed to: ${state}`);
    this.notify();
  }
}
