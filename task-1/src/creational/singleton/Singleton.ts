import logger from "../../utils/Logger";
import { AppException } from "../../utils/Exception";

export class Singleton {
  private static instance: Singleton;
  private data: string;

  private constructor() {
    this.data = "Initial Data";
    logger.info("Singleton instance created.");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public getData(): string {
    return this.data;
  }

  public setData(data: string): void {
    this.data = data;
    logger.info(`Singleton data updated to: ${data}`);
  }
}
