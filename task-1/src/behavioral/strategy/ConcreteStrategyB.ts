import { Strategy } from "./Strategy";

export class ConcreteStrategyB implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}
