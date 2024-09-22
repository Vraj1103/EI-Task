// app/commands/MarkTaskAsCompletedCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { Logger } from "../../Logger";

export class MarkTaskAsCompletedCommand implements Command {
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
    this.rl.question(
      "Enter the description of the task to mark as completed: ",
      (description) => {
        const task = this.scheduleManager.findTaskByDescription(description);
        if (task) {
          task.isCompleted = true;
          console.log(`Task "${description}" marked as completed.`);
          Logger.logInfo(`Task "${description}" marked as completed.`);
        } else {
          console.log(`Task "${description}" not found.`);
          Logger.logError(`Task "${description}" not found.`);
        }
        this.callback();
      }
    );
  }
}
