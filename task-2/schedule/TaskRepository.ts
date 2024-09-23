import { Task, PriorityLevel } from "../Task";

/**
 * Class responsible for managing the collection of tasks.
 */
export class TaskRepository {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
    this.sortTasks();
  }

  public removeTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public updateTask(oldTask: Task, newTask: Task): void {
    const index = this.tasks.indexOf(oldTask);
    if (index !== -1) {
      this.tasks[index] = newTask;
      this.sortTasks();
    }
  }

  public findTaskByDescription(description: string): Task | undefined {
    return this.tasks.find((task) => task.description === description);
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksByPriority(priority: PriorityLevel): Task[] {
    return this.tasks.filter((task) => task.priority === priority);
  }

  private sortTasks(): void {
    this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }
}
