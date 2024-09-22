// schedule/ScheduleManagerBase.ts

import { Task, PriorityLevel } from "../Task";
import { Observer, Subject } from "../Observer";

/**
 * Interface for task management operations.
 */
export interface IScheduleManager extends Subject {
  addTask(task: Task): void;
  removeTask(description: string): void;
  updateTask(oldTask: Task, newTask: Task): void;
  findTaskByDescription(description: string): Task | undefined;
  viewTasks(): Task[];
  getTasksByPriority(priority: PriorityLevel): Task[];
}

/**
 * Interface for task conflict checking.
 */
export interface ITaskConflictChecker {
  hasConflict(task: Task, tasks: Task[]): boolean;
  getConflictingTasks(task: Task, tasks: Task[]): Task[];
}
