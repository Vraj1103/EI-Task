import { Singleton } from "./Singleton";

export function loggerInstanceUseCase() {
  const logger1 = Singleton.getInstance();
  logger1.setData("Logger Initialized");

  const logger2 = Singleton.getInstance();
  console.log(`Logger2 Data: ${logger2.getData()}`); // Should show 'Logger Initialized'
}
