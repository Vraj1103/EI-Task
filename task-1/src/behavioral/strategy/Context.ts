import { Strategy } from "./Strategy";
import logger from "../../utils/Logger";

export class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
    logger.info("Strategy set in context.");
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
    logger.info("Strategy updated in context.");
  }

  executeStrategy(a: number, b: number): number {
    logger.info("Executing strategy...");
    return this.strategy.execute(a, b);
  }
}
