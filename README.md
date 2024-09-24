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
