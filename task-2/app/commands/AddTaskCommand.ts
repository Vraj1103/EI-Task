import { Command } from "./Command";
import * as readline from "readline";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { TaskFactory } from "../../TaskFactory";
import { InputParser } from "../utils/InputParser";
import { Logger } from "../../Logger";

export class AddTaskCommand implements Command {
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
    this.rl.question("Enter task description: ", (description) => {
      this.rl.question("Enter start time (HH:MM): ", (startTimeStr) => {
        this.rl.question("Enter end time (HH:MM): ", (endTimeStr) => {
          this.rl.question(
            "Enter priority level (Low, Medium, High): ",
            (priorityStr) => {
              try {
                const startTime = InputParser.parseTime(startTimeStr);
                const endTime = InputParser.parseTime(endTimeStr);
                if (endTime <= startTime) {
                  throw new Error("End time must be after start time.");
                }
                const priority = InputParser.parsePriority(priorityStr);
                const task = TaskFactory.createTask(
                  description,
                  startTime,
                  endTime,
                  priority
                );
                this.scheduleManager.addTask(task);
              } catch (error) {
                if (error instanceof Error) {
                  Logger.logError(error.message);
                }
              }
              this.callback();
            }
          );
        });
      });
    });
  }
}
