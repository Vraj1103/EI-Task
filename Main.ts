// Main.ts

import * as readline from "readline";
import { TaskFactory } from "./TaskFactory";
import { Task, PriorityLevel } from "./Task";
import { ScheduleManager } from "./ScheduleManager";
import { Logger } from "./Logger";
import { Observer } from "./Observer";

/**
 * Observer implementation for console notifications.
 */
class ConsoleObserver implements Observer {
  update(message: string): void {
    console.log(message);
  }
}

/**
 * Main application class.
 */
class Application {
  private scheduleManager: ScheduleManager;
  private rl: readline.Interface;

  constructor() {
    this.scheduleManager = ScheduleManager.getInstance();
    this.scheduleManager.registerObserver(new ConsoleObserver());
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Starts the application.
   */
  public run(): void {
    this.showMenu();
  }

  /**
   * Displays the main menu.
   */
  private showMenu(): void {
    console.log("\nAstronaut Daily Schedule Organizer");
    console.log("1. Add Task");
    console.log("2. Remove Task");
    console.log("3. Edit Task");
    console.log("4. Mark Task as Completed");
    console.log("5. View Tasks");
    console.log("6. View Tasks by Priority");
    console.log("7. Exit");
    this.rl.question("Please select an option: ", (answer) => {
      switch (answer.trim()) {
        case "1":
          this.addTask();
          break;
        case "2":
          this.removeTask();
          break;
        case "3":
          this.editTask();
          break;
        case "4":
          this.markTaskAsCompleted();
          break;
        case "5":
          this.viewTasks();
          break;
        case "6":
          this.viewTasksByPriority();
          break;
        case "7":
          this.exit();
          break;
        default:
          console.log("Invalid option. Please try again.");
          this.showMenu();
          break;
      }
    });
  }

  /**
   * Adds a new task.
   */
  private addTask(): void {
    this.rl.question("Enter task description: ", (description) => {
      this.rl.question("Enter start time (HH:MM): ", (startTimeStr) => {
        this.rl.question("Enter end time (HH:MM): ", (endTimeStr) => {
          this.rl.question(
            "Enter priority level (Low, Medium, High): ",
            (priorityStr) => {
              try {
                const startTime = this.parseTime(startTimeStr);
                const endTime = this.parseTime(endTimeStr);
                if (endTime <= startTime) {
                  throw new Error("End time must be after start time.");
                }
                const priority = this.parsePriority(priorityStr);
                const task = TaskFactory.createTask(
                  description,
                  startTime,
                  endTime,
                  priority
                );
                this.scheduleManager.addTask(task);
              } catch (error) {
                if (error instanceof Error) {
                  //   console.error(`Error: ${error.message}`);
                  Logger.logError(error.message);
                }
              }
              this.showMenu();
            }
          );
        });
      });
    });
  }

  /**
   * Removes an existing task.
   */
  private removeTask(): void {
    this.rl.question("Enter task description to remove: ", (description) => {
      try {
        this.scheduleManager.removeTask(description);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
          Logger.logError(error.message);
        }
      }
      this.showMenu();
    });
  }

  /**
   * Edits an existing task.
   */
  private editTask(): void {
    this.rl.question(
      "Enter the description of the task to edit: ",
      (description) => {
        const task = this.scheduleManager.findTaskByDescription(description);
        if (task) {
          this.rl.question(
            `Enter new description (${task.description}): `,
            (newDescription) => {
              this.rl.question(
                `Enter new start time (${this.formatTime(task.startTime)}): `,
                (startTimeStr) => {
                  this.rl.question(
                    `Enter new end time (${this.formatTime(task.endTime)}): `,
                    (endTimeStr) => {
                      this.rl.question(
                        `Enter new priority (${task.priority}): `,
                        (priorityStr) => {
                          try {
                            const newStartTime = startTimeStr
                              ? this.parseTime(startTimeStr)
                              : task.startTime;
                            const newEndTime = endTimeStr
                              ? this.parseTime(endTimeStr)
                              : task.endTime;
                            const newPriority = priorityStr
                              ? this.parsePriority(priorityStr)
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
                          this.showMenu();
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
          this.showMenu();
        }
      }
    );
  }

  /**
   * Marks a task as completed.
   */
  private markTaskAsCompleted(): void {
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
        this.showMenu();
      }
    );
  }

  /**
   * Views all tasks.
   */
  private viewTasks(): void {
    const tasks = this.scheduleManager.viewTasks();
    if (tasks.length === 0) {
      console.log("No tasks scheduled for the day.");
    } else {
      for (let task of tasks) {
        console.log(
          `${this.formatTime(task.startTime)} - ${this.formatTime(
            task.endTime
          )}: ${task.description} [${task.priority}]${
            task.isCompleted ? " (Completed)" : ""
          }`
        );
      }
    }
    this.showMenu();
  }

  /**
   * Views tasks filtered by priority.
   */
  private viewTasksByPriority(): void {
    this.rl.question(
      "Enter priority level (Low, Medium, High): ",
      (priorityStr) => {
        try {
          const priority = this.parsePriority(priorityStr);
          const tasks = this.scheduleManager.getTasksByPriority(priority);
          if (tasks.length === 0) {
            console.log(`No tasks with priority ${priority}.`);
          } else {
            for (let task of tasks) {
              console.log(
                `${this.formatTime(task.startTime)} - ${this.formatTime(
                  task.endTime
                )}: ${task.description} [${task.priority}]${
                  task.isCompleted ? " (Completed)" : ""
                }`
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            Logger.logError(error.message);
          }
        }
        this.showMenu();
      }
    );
  }

  /**
   * Exits the application.
   */
  private exit(): void {
    console.log("Exiting application...");
    this.rl.close();
    process.exit(0);
  }

  /**
   * Parses a time string into a Date object.
   */
  private parseTime(timeStr: string): Date {
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(timeStr)) {
      throw new Error(
        "Invalid time format. Please use HH:MM (24-hour format)."
      );
    }
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  /**
   * Formats a Date object into a time string.
   */
  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  /**
   * Parses a priority string into a PriorityLevel enum.
   */
  private parsePriority(priorityStr: string): PriorityLevel {
    switch (priorityStr.trim().toLowerCase()) {
      case "low":
        return PriorityLevel.Low;
      case "medium":
        return PriorityLevel.Medium;
      case "high":
        return PriorityLevel.High;
      default:
        throw new Error(
          "Invalid priority level. Please enter Low, Medium, or High."
        );
    }
  }
}

const app = new Application();
app.run();
