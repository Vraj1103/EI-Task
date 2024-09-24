# Task 1: Implementing and Demonstrating Software Design Patterns in TypeScript

## Table of Contents

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Project Structure](#project-structure)
- [Design Patterns Implemented](#design-patterns-implemented)
  - [Behavioral Patterns](#behavioral-patterns)
    - [Observer Pattern](#observer-pattern)
    - [Strategy Pattern](#strategy-pattern)
  - [Creational Patterns](#creational-patterns)
    - [Singleton Pattern](#singleton-pattern)
    - [Factory Pattern](#factory-pattern)
  - [Structural Patterns](#structural-patterns)
    - [Adapter Pattern](#adapter-pattern)
    - [Decorator Pattern](#decorator-pattern)
- [Implementation Details](#implementation-details)
  - [Logging Mechanism](#logging-mechanism)
  - [Exception Handling](#exception-handling)
- [Setup Instructions](#setup-instructions)
- [Task - 2](#Task-2)

---

## Introduction

In modern software development, adhering to design patterns is crucial for creating scalable, maintainable, and efficient applications. This project serves as a comprehensive demonstration of various **software design patterns** implemented in **TypeScript**. By organizing the code according to global best practices and standards, the project showcases how different design patterns can be effectively utilized to solve common software engineering problems.

## Objectives

- **Demonstrate Understanding:** Showcase proficiency in implementing behavioral, creational, and structural design patterns.
- **Adhere to Best Practices:** Ensure the codebase is well-organized, readable, and maintainable by following global best practices.
- **Implement Robust Mechanisms:** Incorporate logging, exception handling, and other defensive programming techniques to enhance reliability.
- **Optimize Performance:** Ensure the application is highly optimized for performance, suitable for long-running processes.
- **Facilitate Scalability:** Structure the project to allow easy addition of new features and patterns in the future.

## Project Structure

The project is meticulously organized to separate concerns and enhance readability. Each design pattern resides in its dedicated directory, further categorized by its type (behavioral, creational, structural). Within each pattern's directory, individual files represent classes, interfaces, and specific use cases.

### Key Highlights:

- **Separation of Concerns:** Each design pattern is isolated within its own directory, preventing interdependencies and enhancing modularity.
- **Descriptive Naming:** Files and classes are named clearly to reflect their roles and functionalities.
- **Utility Modules:** Shared utilities like logging and exception handling are centralized in the `utils` directory.

## Design Patterns Implemented

This project encapsulates six distinct design patterns categorized into behavioral, creational, and structural types. Each pattern is demonstrated through two practical use cases, illustrating its versatility and applicability.

### Behavioral Patterns

Behavioral patterns focus on communication between objects, defining how objects interact and distribute responsibilities.

#### Observer Pattern

**Purpose:** Establish a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

**Use Cases:**

1. **NewsPublisher:** Demonstrates how subscribers receive updates from a news publisher.
2. **StockPriceMonitor:** Shows how observers are notified about stock price changes.

**Implementation Details:**

- **Observer Interface (`Observer.ts`):** Defines the `update` method for observers.
- **Subject Interface (`Subject.ts`):** Defines methods to attach, detach, and notify observers.
- **ConcreteSubject (`ConcreteSubject.ts`):** Manages state changes and notifies observers.
- **ConcreteObserverA (`ConcreteObserverA.ts`):** Represents subscribers that display messages.
- **ConcreteObserverB (`ConcreteObserverB.ts`):** Represents subscribers that log messages.
- **Use Cases:**
  - **NewsPublisher.ts:** Simulates a news publisher notifying subscribers.
  - **StockPriceMonitor.ts:** Simulates a stock price monitor notifying traders and analysts.

#### Strategy Pattern

**Purpose:** Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

**Use Cases:**

1. **SortingAlgorithms:** Demonstrates different sorting strategies.
2. **PaymentProcessing:** Shows various payment processing strategies.

**Implementation Details:**

- **Strategy Interface (`Strategy.ts`):** Defines the `execute` method for strategies.
- **ConcreteStrategyA (`ConcreteStrategyA.ts`):** Implements a specific strategy (e.g., addition).
- **ConcreteStrategyB (`ConcreteStrategyB.ts`):** Implements another strategy (e.g., multiplication).
- **Context (`Context.ts`):** Maintains a reference to a strategy and delegates execution.
- **Use Cases:**
  - **SortingAlgorithms.ts:** Demonstrates switching between addition and multiplication strategies.
  - **PaymentProcessing.ts:** Demonstrates switching between credit card and PayPal payment strategies.

### Creational Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

#### Singleton Pattern

**Purpose:** Ensure a class has only one instance and provide a global point of access to it.

**Use Cases:**

1. **ConfigurationManager:** Manages application configuration settings.
2. **LoggerInstance:** Ensures a single logger instance throughout the application.

**Implementation Details:**

- **Singleton Class (`Singleton.ts`):** Implements the singleton logic.
- **Use Cases:**
  - **ConfigurationManager.ts:** Demonstrates shared configuration data.
  - **LoggerInstance.ts:** Demonstrates consistent logging across the application.

#### Factory Pattern

**Purpose:** Define an interface for creating an object but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

**Use Cases:**

1. **ShapeFactory:** Creates different types of shapes.
2. **NotificationFactory:** Generates various types of notifications.

**Implementation Details:**

- **Product Interface (`Product.ts`):** Defines the `use` method for products.
- **Concrete Products (`ConcreteProductA.ts`, `ConcreteProductB.ts`):** Implement specific products.
- **Factory (`Factory.ts`):** Creates products based on type.
- **Use Cases:**
  - **ShapeFactory.ts:** Demonstrates creation of different shape objects.
  - **NotificationFactory.ts:** Demonstrates creation of different notification objects, including error handling for unknown types.

### Structural Patterns

Structural patterns are concerned with how classes and objects are composed to form larger structures.

#### Adapter Pattern

**Purpose:** Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.

**Use Cases:**

1. **MediaPlayerAdapter:** Adapts different media player formats.
2. **PaymentGatewayAdapter:** Integrates with external payment gateways.

**Implementation Details:**

- **Target Interface (`Target.ts`):** Defines the desired interface.
- **Adaptee (`Adaptee.ts`):** Defines an existing interface that needs adapting.
- **Adapter (`Adapter.ts`):** Implements the Target interface and translates requests to the Adaptee.
- **Use Cases:**
  - **MediaPlayerAdapter.ts:** Demonstrates adapting a media player to a new interface.
  - **PaymentGatewayAdapter.ts:** Demonstrates integrating a PayPal service with a payment gateway interface.

#### Decorator Pattern

**Purpose:** Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

**Use Cases:**

1. **CoffeeOrderingSystem:** Adds various additions to a coffee order dynamically.
2. **MessageFormatting:** Applies different formatting styles to messages.

**Implementation Details:**

- **Component Interface (`Component.ts`):** Defines the `operation` method.
- **ConcreteComponent (`ConcreteComponent.ts`):** Implements the base functionality.
- **Decorator (`Decorator.ts`):** Maintains a reference to a Component and defines an interface for additional behaviors.
- **Concrete Decorators (`ConcreteDecoratorA.ts`, `ConcreteDecoratorB.ts`):** Add specific functionalities.
- **Use Cases:**
  - **CoffeeOrderingSystem.ts:** Demonstrates adding milk and sugar to a coffee order.
  - **MessageFormatting.ts:** Demonstrates formatting messages to uppercase.

## Implementation Details

### Logging Mechanism

A centralized logging mechanism is implemented using **Winston**, a versatile logging library for Node.js. The logger is configured to output logs to both the console and a file (`logs/app.log`) with structured JSON formatting, including timestamps and log levels.

```typescript
// src/utils/Logger.ts
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
  exitOnError: false,
});

export default logger;
```

### Exception Handling

A custom exception class, (`AppException`), is created to provide consistent error handling across the application. This class extends the built-in (`Error`) class, allowing for additional properties like (`cause`).

```typescript
// src/utils/Exception.ts
export class AppException extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

## Setup Instructions

1.  **Prerequisites:**

```bash
npm install -g typescript
```

2. **Project Initialization:**

```bash
git clone https://github.com/Vraj1103/EI-Task.git
cd task-1
npm install
```

3. **Run the project**

```bash
npm run build
npm start
```

## Output

## The output will be displayed in the console, showcasing the execution of various design patterns and their use cases.

```json
{"level":"info","message":"Starting Design Patterns Project","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing Observer Use Cases","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"ConcreteObserverA (Subscriber A) created.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"ConcreteObserverB (Subscriber B) created.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Observer attached.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Observer attached.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Subject state changed to: Breaking News: Observer Pattern Implemented Successfully!","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Notifying observers...","timestamp":"2024-09-23 21:14:22"}
[Subscriber A] Received update: Breaking News: Observer Pattern Implemented Successfully!
{"level":"info","message":"ConcreteObserverA (Subscriber A) received message: Breaking News: Observer Pattern Implemented Successfully!","timestamp":"2024-09-23 21:14:22"}
[Subscriber A] Displaying message: Breaking News: Observer Pattern Implemented Successfully!
[Subscriber B] Logging update: Breaking News: Observer Pattern Implemented Successfully!
{"level":"info","message":"ConcreteObserverB (Subscriber B) logged message: Breaking News: Observer Pattern Implemented Successfully!","timestamp":"2024-09-23 21:14:22"}
[Subscriber B] Logged message: Breaking News: Observer Pattern Implemented Successfully!
{"level":"info","message":"ConcreteObserverA (Trader Joe) created.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"ConcreteObserverB (Analyst Jane) created.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Observer attached.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Observer attached.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Subject state changed to: Stock Update: AAPL is up by 5%","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Notifying observers...","timestamp":"2024-09-23 21:14:22"}
[Trader Joe] Received update: Stock Update: AAPL is up by 5%
{"level":"info","message":"ConcreteObserverA (Trader Joe) received message: Stock Update: AAPL is up by 5%","timestamp":"2024-09-23 21:14:22"}
[Trader Joe] Displaying message: Stock Update: AAPL is up by 5%
[Analyst Jane] Logging update: Stock Update: AAPL is up by 5%
{"level":"info","message":"ConcreteObserverB (Analyst Jane) logged message: Stock Update: AAPL is up by 5%","timestamp":"2024-09-23 21:14:22"}
[Analyst Jane] Logged message: Stock Update: AAPL is up by 5%
{"level":"info","message":"Executing Strategy Use Cases","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Strategy set in context.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing strategy...","timestamp":"2024-09-23 21:14:22"}
Addition Result: 8
{"level":"info","message":"Strategy updated in context.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing strategy...","timestamp":"2024-09-23 21:14:22"}
Multiplication Result: 15
{"level":"info","message":"Payment strategy set.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing payment of 100...","timestamp":"2024-09-23 21:14:22"}
Paid 100 using Credit Card.
{"level":"info","message":"Payment of 100 processed via Credit Card.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Payment strategy updated.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing payment of 200...","timestamp":"2024-09-23 21:14:22"}
Paid 200 using PayPal.
{"level":"info","message":"Payment of 200 processed via PayPal.","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Executing Singleton Use Cases","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Singleton instance created.","timestamp":"2024-09-23 21:14:22"}
Config1 Data: Initial Data
{"level":"info","message":"Singleton data updated to: Updated Config Data","timestamp":"2024-09-23 21:14:22"}
Config1 Data after update: Updated Config Data
{"level":"info","message":"Singleton data updated to: Logger Initialized","timestamp":"2024-09-23 21:14:22"}
Logger2 Data: Logger Initialized
{"level":"info","message":"Executing Factory Use Cases","timestamp":"2024-09-23 21:14:22"}
{"level":"info","message":"Creating ConcreteProductA","timestamp":"2024-09-23 21:14:22"}
Using ConcreteProductA
{"level":"info","message":"Creating ConcreteProductB","timestamp":"2024-09-23 21:14:22"}
Using ConcreteProductB
{"level":"info","message":"Creating ConcreteProductA","timestamp":"2024-09-23 21:14:22"}
Using ConcreteProductA
{"level":"info","message":"Creating ConcreteProductB","timestamp":"2024-09-23 21:14:22"}
Using ConcreteProductB
{"level":"error","message":"Unknown product type: C","timestamp":"2024-09-23 21:14:22"}
Error: Unknown product type: C
{"level":"info","message":"Executing Adapter Use Cases","timestamp":"2024-09-23 21:14:22"}
Adaptee: Specific request.
Processed payment of 250 via PayPal.
{"level":"info","message":"Executing Decorator Use Cases","timestamp":"2024-09-23 21:14:22"}
Plain Coffee: ConcreteComponent
With Milk: ConcreteDecoratorA(ConcreteComponent)
With Milk and Sugar: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
Original Message: Hello, Decorator Pattern!
UpperCase Message: HELLO, DECORATOR PATTERN!
{"level":"info","message":"Design Patterns Project Completed Successfully","timestamp":"2024-09-23 21:14:22"}
```

# Task 2: Astronaut Daily Schedule Organizer

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Key Functionalities](#key-functionalities)
4. [Logging Functionality](#logging-functionality)
5. [Thought Process](#thought-process)
6. [Project Setup Guide](#project-setup-guide)
7. [Conclusion](#conclusion)

---

## 1. Introduction

This project provides a command-line application that helps astronauts organize their daily tasks. The main objective of the project is to manage tasks such as adding, editing, viewing, and removing tasks while preventing scheduling conflicts. This document explains the core functionalities, design decisions, and setup guide for running the project locally.

---

## 2. Project Overview

The Astronaut Daily Schedule Organizer is a task management tool that allows users to manage daily schedules. The system ensures that tasks do not overlap in time and provides features like viewing tasks based on priority levels, marking tasks as completed, and logging actions. The application leverages design patterns such as Singleton, Command, and Observer to ensure a modular and maintainable codebase.

---

## 3. Key Functionalities

### Add Task

- **Description**: Users can add a new task by providing a description, start time, end time, and priority level.
- **Conflict Prevention**: The system checks for conflicts and prevents adding tasks that overlap with existing tasks.

### Remove Task

- **Description**: Users can remove a task from their schedule by providing the task's description.

### Edit Task

- **Description**: Users can modify the details of an existing task. The system ensures that no task conflicts arise after the update.

### Mark Task as Completed

- **Description**: Users can mark tasks as completed, updating the task's status in the schedule.

### View Tasks

- **Description**: Users can view all tasks sorted by their start time.

### View Tasks by Priority

- **Description**: Users can filter tasks based on their priority (Low, Medium, High) and view them accordingly.

---

## 4. Logging Functionality

The application includes logging capabilities for tracking user actions and system events. The logger records:

- **Info Logs**: Successful operations such as adding, editing, or removing tasks.
- **Error Logs**: Issues such as scheduling conflicts, invalid time inputs, or attempts to edit or remove non-existent tasks.

All logs are saved to a file (`application.log`) for auditing and debugging purposes. This helps track user activity and identify issues with the system.

---

## 5. Thought Process

### Design Patterns

- **Singleton Pattern**: Ensures that only one instance of the `ScheduleManager` exists, centralizing task management and preventing conflicts.
- **Command Pattern**: Each user action (e.g., adding, removing, editing tasks) is encapsulated into its own command class, making it easier to add or modify functionalities.
- **Observer Pattern**: Notifies observers (such as the `ConsoleObserver`) when significant events occur, such as when a task is added or removed, promoting decoupled communication.

### Separation of Concerns

Each file or module in the application has a single responsibility, enhancing the overall maintainability and readability of the codebase. This modular design ensures that each part of the system is easy to modify or extend in the future.

### Conflict Handling

The application strictly checks for overlapping tasks. Tasks that have start and end times that overlap with existing tasks are prevented from being added or edited. This ensures that no astronaut has conflicting tasks in their schedule.

---

## 6. Project Setup Guide

Follow these steps to set up and run the Astronaut Daily Schedule Organizer locally:

1. **Clone the Repository**: Clone the repository or download the source code.

   ```bash
   git clone https://github.com/Vraj1103/EI-Task.git
   ```

2. **Install Dependencies: Ensure Node.js is installed, then run:**

```bash
npm install
```

3. **Compile TypeScript: To compile the TypeScript code to JavaScript, run:**

```bash
tsc
```

4. **Run the Application: Once compiled, you can run the app:**

```bash
node dist/Main.js
```

5. **Follow the Prompts: Use the command-line interface to add, edit, or remove tasks.**
