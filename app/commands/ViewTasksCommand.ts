// app/commands/ViewTasksCommand.ts

import { Command } from "./Command";
import { ScheduleManager } from "../../ScheduleManager";
import { InputParser } from "../utils/InputParser";

export class ViewTasksCommand implements Command {
  private scheduleManager: ScheduleManager;
  private callback: () => void;

  constructor(scheduleManager: ScheduleManager, callback: () => void) {
    this.scheduleManager = scheduleManager;
    this.callback = callback;
  }

  public execute(): void {
    const tasks = this.scheduleManager.viewTasks();
    if (tasks.length === 0) {
      console.log("No tasks scheduled for the day.");
    } else {
      for (let task of tasks) {
        console.log(
          `${InputParser.formatTime(task.startTime)} - ${InputParser.formatTime(
            task.endTime
          )}: ${task.description} [${task.priority}]${
            task.isCompleted ? " (Completed)" : ""
          }`
        );
      }
    }
    this.callback();
  }
}
