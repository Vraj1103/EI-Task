import { Task } from "../Task";
import { ITaskConflictChecker } from "./ScheduleManagerBase";

/**
 * Class responsible for checking task conflicts.
 */
export class TaskConflictChecker implements ITaskConflictChecker {
  public hasConflict(newTask: Task, tasks: Task[]): boolean {
    return this.getConflictingTasks(newTask, tasks).length > 0;
  }

  public getConflictingTasks(newTask: Task, tasks: Task[]): Task[] {
    return tasks.filter(
      (task) =>
        newTask.startTime < task.endTime && newTask.endTime > task.startTime
    );
  }
}
