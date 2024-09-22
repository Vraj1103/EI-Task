// app/utils/InputParser.ts

import { PriorityLevel } from "../../Task";

/**
 * Utility class for parsing inputs.
 */
export class InputParser {
  /**
   * Parses a time string into a Date object.
   */
  public static parseTime(timeStr: string): Date {
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
  public static formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  /**
   * Parses a priority string into a PriorityLevel enum.
   */
  public static parsePriority(priorityStr: string): PriorityLevel {
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
