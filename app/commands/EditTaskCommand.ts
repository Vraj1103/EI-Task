// app/commands/EditTaskCommand.ts

import { Command } from "./Command";
import * as readline from "readline";
import { IScheduleManager } from "../../schedule/ScheduleManagerBase";
import { InputParser } from "../utils/InputParser";
import { TaskFactory } from "../../TaskFactory";
import { Logger } from "../../Logger";

export class EditTaskCommand implements Command {
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
      "Enter the description of the task to edit: ",
      (description) => {
        const task = this.scheduleManager.findTaskByDescription(description);
        if (task) {
          this.rl.question(
            `Enter new description (${task.description}): `,
            (newDescription) => {
              this.rl.question(
                `Enter new start time (${InputParser.formatTime(
                  task.startTime
                )}): `,
                (startTimeStr) => {
                  this.rl.question(
                    `Enter new end time (${InputParser.formatTime(
                      task.endTime
                    )}): `,
                    (endTimeStr) => {
                      this.rl.question(
                        `Enter new priority (${task.priority}): `,
                        (priorityStr) => {
                          try {
                            const newStartTime = startTimeStr
                              ? InputParser.parseTime(startTimeStr)
                              : task.startTime;
                            const newEndTime = endTimeStr
                              ? InputParser.parseTime(endTimeStr)
                              : task.endTime;
                            const newPriority = priorityStr
                              ? InputParser.parsePriority(priorityStr)
                              : task.priority;
                            if (newEndTime <= newStartTime) {
                              throw new Error(
                                "End time must be after start time."
                              );
                            }
                            const updatedTask = TaskFactory.createTask(
                              newDescription || task.description,
                              newStartTime,
                              newEndTime,
                              newPriority
                            );
                            this.scheduleManager.updateTask(task, updatedTask);
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
                  );
                }
              );
            }
          );
        } else {
          console.log(`Task "${description}" not found.`);
          this.callback();
        }
      }
    );
  }
}
