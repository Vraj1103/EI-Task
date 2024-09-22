// app/commands/RemoveTaskCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { ScheduleManager } from "../../ScheduleManager";
import { Logger } from "../../Logger";

export class RemoveTaskCommand implements Command {
  private rl: readline.Interface;
  private scheduleManager: ScheduleManager;
  private callback: () => void;

  constructor(
    rl: readline.Interface,
    scheduleManager: ScheduleManager,
    callback: () => void
  ) {
    this.rl = rl;
    this.scheduleManager = scheduleManager;
    this.callback = callback;
  }

  public execute(): void {
    this.rl.question("Enter task description to remove: ", (description) => {
      try {
        this.scheduleManager.removeTask(description);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
          Logger.logError(error.message);
        }
      }
      this.callback();
    });
  }
}
