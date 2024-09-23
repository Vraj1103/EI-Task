import { Command } from "./Command";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { InputParser } from "../utils/InputParser";
import { Logger } from "../../Logger";

export class ViewTasksCommand implements Command {
  private scheduleManager: IScheduleManager;
  private callback: () => void;

  constructor(scheduleManager: IScheduleManager, callback: () => void) {
    this.scheduleManager = scheduleManager;
    this.callback = callback;
  }

  public execute(): void {
    const tasks = this.scheduleManager.viewTasks();
    if (tasks.length === 0) {
      console.log("No tasks scheduled for the day.");
      Logger.logInfo("Viewed tasks: No tasks scheduled for the day.");
    } else {
      console.log("Viewing all tasks:");
      for (let task of tasks) {
        console.log(
          `${InputParser.formatTime(task.startTime)} - ${InputParser.formatTime(
            task.endTime
          )}: ${task.description} [${task.priority}]${
            task.isCompleted ? " (Completed)" : ""
          }`
        );
      }
      Logger.logInfo(`Viewed all tasks. Total tasks: ${tasks.length}.`);
    }
    this.callback();
  }
}
