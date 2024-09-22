// app/commands/RemoveTaskCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { Logger } from "../../Logger";

export class RemoveTaskCommand implements Command {
  private rl: readline.Interface;
  private scheduleManager: IScheduleManager;
  private callback: () => void;

  constructor(
    rl: readline.Interface,
    scheduleManager: IScheduleManager,
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
