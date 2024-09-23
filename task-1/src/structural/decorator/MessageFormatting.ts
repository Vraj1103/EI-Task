import { Component } from "./Component";
import { ConcreteComponent } from "./ConcreteComponent";
import { ConcreteDecoratorA } from "./ConcreteDecoratorA";

export function messageFormattingUseCase() {
  // Example: Message Formatting
  class Message implements Component {
    private text: string;

    constructor(text: string) {
      this.text = text;
    }

    operation(): string {
      return this.text;
    }
  }

  class UpperCaseDecorator extends ConcreteDecoratorA {
    operation(): string {
      return this.component.operation().toUpperCase();
    }
  }

  const message: Component = new Message("Hello, Decorator Pattern!");
  console.log(`Original Message: ${message.operation()}`); // Original Message: Hello, Decorator Pattern!

  const upperCaseMessage = new UpperCaseDecorator(message);
  console.log(`UpperCase Message: ${upperCaseMessage.operation()}`); // UpperCase Message: HELLO, DECORATOR PATTERN!
}
