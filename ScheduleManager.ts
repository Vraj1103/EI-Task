// ScheduleManager.ts

import { Task, PriorityLevel } from "./Task";
import { Observer, Subject } from "./Observer";
import { Logger } from "./Logger";

/**
 * Singleton class that manages all tasks.
 * Implements the Subject interface for the Observer Pattern.
 */
export class ScheduleManager implements Subject {
  private static instance: ScheduleManager;
  private tasks: Task[];
  private observers: Observer[];

  private constructor() {
    this.tasks = [];
    this.observers = [];
  }

  /**
   * Gets the single instance of ScheduleManager.
   */
  public static getInstance(): ScheduleManager {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }

  /**
   * Adds a task after checking for conflicts.
   */
  public addTask(task: Task): void {
    const conflictingTasks = this.getConflictingTasks(task);
    if (conflictingTasks.length > 0) {
      const conflictingDescriptions = conflictingTasks
        .map((t) => `"${t.description}"`)
        .join(", ");
      const message = `Error: Task conflicts with existing task(s): ${conflictingDescriptions}.`;
      this.notifyObservers(message);
      Logger.logError(message);
      throw new Error(message);
    } else {
      this.tasks.push(task);
      this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      const message = `Task "${task.description}" added successfully.`;
      this.notifyObservers(message);
      Logger.logInfo(message);
    }
  }

  /**
   * Removes a task by description.
   */
  public removeTask(description: string): void {
    const index = this.tasks.findIndex(
      (task) => task.description === description
    );
    if (index !== -1) {
      this.tasks.splice(index, 1);
      const message = `Task "${description}" removed successfully.`;
      this.notifyObservers(message);
      Logger.logInfo(message);
    } else {
      const message = `Error: Task "${description}" not found.`;
      this.notifyObservers(message);
      Logger.logError(message);
      throw new Error(message);
    }
  }

  /**
   * Finds a task by description.
   */
  public findTaskByDescription(description: string): Task | undefined {
    return this.tasks.find((task) => task.description === description);
  }

  public getConflictingTasks(newTask: Task): Task[] {
    return this.tasks.filter(
      (task) =>
        newTask.startTime < task.endTime && newTask.endTime > task.startTime
    );
  }

  /**
   * Updates an existing task.
   */
  public updateTask(oldTask: Task, newTask: Task): void {
    const index = this.tasks.indexOf(oldTask);
    if (index !== -1) {
      // Temporarily remove the old task
      this.tasks.splice(index, 1);

      if (this.isConflict(newTask)) {
        // Restore the old task
        this.tasks.splice(index, 0, oldTask);
        const message = `Error: Updated task conflicts with existing task(s).`;
        this.notifyObservers(message);
        Logger.logError(message);
        throw new Error(message);
      } else {
        this.tasks.splice(index, 0, newTask);
        this.tasks.sort(
          (a, b) => a.startTime.getTime() - b.startTime.getTime()
        );
        const message = `Task "${oldTask.description}" updated successfully.`;
        this.notifyObservers(message);
        Logger.logInfo(message);
      }
    } else {
      const message = `Error: Task "${oldTask.description}" not found.`;
      this.notifyObservers(message);
      Logger.logError(message);
      throw new Error(message);
    }
  }

  /**
   * Retrieves all tasks.
   */
  public viewTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Retrieves tasks by priority.
   */
  public getTasksByPriority(priority: PriorityLevel): Task[] {
    return this.tasks.filter((task) => task.priority === priority);
  }

  /**
   * Checks if a new task conflicts with existing tasks.
   */
  public isConflict(newTask: Task): boolean {
    for (let task of this.tasks) {
      if (
        newTask.startTime < task.endTime &&
        newTask.endTime > task.startTime
      ) {
        return true;
      }
    }
    return false;
  }

  // Observer Pattern methods

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notifyObservers(message: string): void {
    for (let observer of this.observers) {
      observer.update(message);
    }
  }
}
