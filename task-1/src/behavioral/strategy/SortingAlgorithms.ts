import { Context } from "./Context";
import { ConcreteStrategyA } from "./ConcreteStrategyA";
import { ConcreteStrategyB } from "./ConcreteStrategyB";

export function sortingAlgorithmsUseCase() {
  const context = new Context(new ConcreteStrategyA());
  console.log(`Addition Result: ${context.executeStrategy(5, 3)}`); // Output: 8

  context.setStrategy(new ConcreteStrategyB());
  console.log(`Multiplication Result: ${context.executeStrategy(5, 3)}`); // Output: 15
}
