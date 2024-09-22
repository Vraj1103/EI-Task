// app/commands/MarkTaskAsCompletedCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { ScheduleManager } from "../../ScheduleManager";
import { Logger } from "../../Logger";

export class MarkTaskAsCompletedCommand implements Command {
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
