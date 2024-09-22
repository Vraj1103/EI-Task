// app/Application.ts

import * as readline from "readline";
import { ScheduleManager } from "../ScheduleManager";
import { ConsoleObserver } from "./observers/ConsoleObserver";

// Import commands
import { Command } from "./commands/Command";
import { AddTaskCommand } from "./commands/AddTaskCommand";
import { RemoveTaskCommand } from "./commands/RemoveTaskCommand";
import { EditTaskCommand } from "./commands/EditTaskCommand";
import { MarkTaskAsCompletedCommand } from "./commands/MarkTaskAsCompletedCommand";
import { ViewTasksCommand } from "./commands/ViewTasksCommand";
import { ViewTasksByPriorityCommand } from "./commands/ViewTasksByPriorityCommand";

/**
 * Main application class.
 */
export class Application {
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
      let command: Command | null = null;
      switch (answer.trim()) {
        case "1":
          command = new AddTaskCommand(
            this.rl,
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "2":
          command = new RemoveTaskCommand(
            this.rl,
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "3":
          command = new EditTaskCommand(
            this.rl,
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "4":
          command = new MarkTaskAsCompletedCommand(
            this.rl,
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "5":
          command = new ViewTasksCommand(
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "6":
          command = new ViewTasksByPriorityCommand(
            this.rl,
            this.scheduleManager,
            this.showMenu.bind(this)
          );
          break;
        case "7":
          this.exit();
          return;
        default:
          console.log("Invalid option. Please try again.");
          this.showMenu();
          return;
      }
      if (command) {
        command.execute();
      }
    });
  }

  /**
   * Exits the application.
   */
  private exit(): void {
    console.log("Exiting application...");
    this.rl.close();
    process.exit(0);
  }
}
