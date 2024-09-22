// app/observers/ConsoleObserver.ts

import { Observer } from "../../Observer";

/**
 * Observer implementation for console notifications.
 */
export class ConsoleObserver implements Observer {
  update(message: string): void {
    console.log(message);
  }
}
