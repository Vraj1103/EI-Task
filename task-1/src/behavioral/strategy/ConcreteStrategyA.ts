import { Strategy } from "./Strategy";

export class ConcreteStrategyA implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}
