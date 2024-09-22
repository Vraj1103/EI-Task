/**
 * Enum representing the priority levels of tasks.
 */
export enum PriorityLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

/**
 * Class representing a Task.
 */
export class Task {
  description: string;
  startTime: Date;
  endTime: Date;
  priority: PriorityLevel;
  isCompleted: boolean;

  constructor(
    description: string,
    startTime: Date,
    endTime: Date,
    priority: PriorityLevel
  ) {
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.priority = priority;
    this.isCompleted = false;
  }
}
