// Observer.ts

/**
 * Observer interface for implementing the Observer Pattern.
 */
export interface Observer {
  update(message: string): void;
}

/**
 * Subject interface for implementing the Observer Pattern.
 */
export interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(message: string): void;
}
