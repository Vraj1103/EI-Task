import { ConcreteSubject } from "./ConcreteSubject";
import { ConcreteObserverA } from "./ConcreteObserverA";
import { ConcreteObserverB } from "./ConcreteObserverB";

export function newsPublisherUseCase() {
  const newsPublisher = new ConcreteSubject();

  const subscriberA = new ConcreteObserverA("Subscriber A");
  const subscriberB = new ConcreteObserverB("Subscriber B");

  newsPublisher.attach(subscriberA);
  newsPublisher.attach(subscriberB);

  newsPublisher.setState(
    "Breaking News: Observer Pattern Implemented Successfully!"
  );
}
