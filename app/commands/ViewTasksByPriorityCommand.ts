// app/commands/ViewTasksByPriorityCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { InputParser } from "../utils/InputParser";
import { Logger } from "../../Logger";

export class ViewTasksByPriorityCommand implements Command {
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
      "Enter priority level (Low, Medium, High): ",
      (priorityStr) => {
        try {
          const priority = InputParser.parsePriority(priorityStr);
          const tasks = this.scheduleManager.getTasksByPriority(priority);
          if (tasks.length === 0) {
            console.log(`No tasks with priority ${priority}.`);
          } else {
            for (let task of tasks) {
              console.log(
                `${InputParser.formatTime(
                  task.startTime
                )} - ${InputParser.formatTime(task.endTime)}: ${
                  task.description
                } [${task.priority}]${task.isCompleted ? " (Completed)" : ""}`
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            Logger.logError(error.message);
          }
        }
        this.callback();
      }
    );
  }
}
