import { Component } from "./Component";
import { ConcreteComponent } from "./ConcreteComponent";
import { ConcreteDecoratorA } from "./ConcreteDecoratorA";
import { ConcreteDecoratorB } from "./ConcreteDecoratorB";

export function coffeeOrderingSystemUseCase() {
  let coffee: Component = new ConcreteComponent();
  console.log(`Plain Coffee: ${coffee.operation()}`); // Plain Coffee: ConcreteComponent

  coffee = new ConcreteDecoratorA(coffee);
  console.log(`With Milk: ${coffee.operation()}`); // With Milk: ConcreteDecoratorA(ConcreteComponent)

  coffee = new ConcreteDecoratorB(coffee);
  console.log(`With Milk and Sugar: ${coffee.operation()}`); // With Milk and Sugar: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
}
