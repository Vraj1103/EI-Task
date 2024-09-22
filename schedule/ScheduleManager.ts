// schedule/ScheduleManager.ts

import { Task, PriorityLevel } from "../Task";
import { Observer } from "../Observer";
import { Logger } from "../Logger";
import { IScheduleManager } from "./ScheduleManagerBase";
import { TaskConflictChecker } from "./TaskConflictChecker";
import { TaskRepository } from "./TaskRepository";

/**
 * Singleton class that manages all tasks.
 * Implements the Subject interface for the Observer Pattern.
 */
export class ScheduleManager implements IScheduleManager {
  private static instance: ScheduleManager;
  private observers: Observer[];
  private taskRepository: TaskRepository;
  private conflictChecker: TaskConflictChecker;

  private constructor() {
    this.observers = [];
    this.taskRepository = new TaskRepository();
    this.conflictChecker = new TaskConflictChecker();
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
    const tasks = this.taskRepository.getAllTasks();
    const conflictingTasks = this.conflictChecker.getConflictingTasks(
      task,
      tasks
    );

    if (conflictingTasks.length > 0) {
      const conflictingDescriptions = conflictingTasks
        .map((t) => `"${t.description}"`)
        .join(", ");
      const message = `Error: Task conflicts with existing task(s): ${conflictingDescriptions}.`;
      throw new Error(message);
    } else {
      this.taskRepository.addTask(task);
      const message = `Task "${task.description}" added successfully.`;
      this.notifyObservers(message);
      Logger.logInfo(message);
    }
  }

  /**
   * Removes a task by description.
   */
  public removeTask(description: string): void {
    const task = this.findTaskByDescription(description);
    if (task) {
      this.taskRepository.removeTask(task);
      const message = `Task "${description}" removed successfully.`;
      this.notifyObservers(message);
      Logger.logInfo(message);
    } else {
      const message = `Error: Task "${description}" not found.`;
      throw new Error(message);
    }
  }

  /**
   * Updates an existing task.
   */
  public updateTask(oldTask: Task, newTask: Task): void {
    const tasks = this.taskRepository
      .getAllTasks()
      .filter((t) => t !== oldTask);
    const conflictingTasks = this.conflictChecker.getConflictingTasks(
      newTask,
      tasks
    );

    if (conflictingTasks.length > 0) {
      const conflictingDescriptions = conflictingTasks
        .map((t) => `"${t.description}"`)
        .join(", ");
      const message = `Error: Updated task conflicts with existing task(s): ${conflictingDescriptions}.`;
      throw new Error(message);
    } else {
      this.taskRepository.updateTask(oldTask, newTask);
      const message = `Task "${oldTask.description}" updated successfully.`;
      this.notifyObservers(message);
      Logger.logInfo(message);
    }
  }

  /**
   * Finds a task by description.
   */
  public findTaskByDescription(description: string): Task | undefined {
    return this.taskRepository.findTaskByDescription(description);
  }

  /**
   * Retrieves all tasks.
   */
  public viewTasks(): Task[] {
    return this.taskRepository.getAllTasks();
  }

  /**
   * Retrieves tasks by priority.
   */
  public getTasksByPriority(priority: PriorityLevel): Task[] {
    return this.taskRepository.getTasksByPriority(priority);
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
