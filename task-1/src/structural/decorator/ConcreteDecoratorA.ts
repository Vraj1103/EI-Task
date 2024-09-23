import { Decorator } from "./Decorator";

export class ConcreteDecoratorA extends Decorator {
  operation(): string {
    return `ConcreteDecoratorA(${this.component.operation()})`;
  }
}
