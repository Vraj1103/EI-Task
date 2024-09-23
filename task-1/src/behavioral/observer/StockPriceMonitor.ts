// src/behavioral/observer/StockPriceMonitor.ts
import { ConcreteSubject } from "./ConcreteSubject";
import { ConcreteObserverA } from "./ConcreteObserverA";
import { ConcreteObserverB } from "./ConcreteObserverB";

export function stockPriceMonitorUseCase() {
  const stockSubject = new ConcreteSubject();

  const trader = new ConcreteObserverA("Trader Joe");
  const analyst = new ConcreteObserverB("Analyst Jane");

  stockSubject.attach(trader);
  stockSubject.attach(analyst);

  stockSubject.setState("Stock Update: AAPL is up by 5%");
}
