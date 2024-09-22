// Logger.ts

import * as fs from "fs";

/**
 * Logger class for logging information and errors.
 */
export class Logger {
  private static logFile = "application.log";

  public static logInfo(message: string): void {
    console.log(`INFO: ${message}`);
    // Also log to file
    this.writeToLog(`INFO: ${message}`);
  }

  public static logError(message: string): void {
    // Log to file instead of console.error
    console.error(`ERROR: ${message}`);
    this.writeToLog(`ERROR: ${message}`);
  }

  private static writeToLog(message: string): void {
    fs.appendFileSync(
      this.logFile,
      `${new Date().toISOString()} - ${message}\n`
    );
  }
}
