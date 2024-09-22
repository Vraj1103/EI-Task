// TaskFactory.ts

import { Task, PriorityLevel } from "./Task";

/**
 * Factory class for creating Task objects.
 */
export class TaskFactory {
  public static createTask(
    description: string,
    startTime: Date,
    endTime: Date,
    priority: PriorityLevel
  ): Task {
    return new Task(description, startTime, endTime, priority);
  }
}
