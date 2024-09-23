// src/index.ts
import logger from "./src/utils/Logger";
// Behavioral Patterns
import { newsPublisherUseCase } from "./src/behavioral/observer/NewsPublisher";
import { stockPriceMonitorUseCase } from "./src/behavioral/observer/StockPriceMonitor";
import { sortingAlgorithmsUseCase } from "./src/behavioral/strategy/SortingAlgorithms";
import { paymentProcessingUseCase } from "./src/behavioral/strategy/PaymentProcessing";

// Creational Patterns
import { configurationManagerUseCase } from "./src/creational/singleton/ConfigurationManager";
import { loggerInstanceUseCase } from "./src/creational/singleton/LoggerInstance";
import { shapeFactoryUseCase } from "./src/creational/factory/ShapeFactory";
import { notificationFactoryUseCase } from "./src/creational/factory/NotificationFactory";

// Structural Patterns
import { mediaPlayerAdapterUseCase } from "./src/structural/adapter/MediaPlayerAdapter";
import { paymentGatewayAdapterUseCase } from "./src/structural/adapter/PaymentGatewayAdapter";

import { coffeeOrderingSystemUseCase } from "./src/structural/decorator/CoffeeOrderingSystem";

import { messageFormattingUseCase } from "./src/structural/decorator/MessageFormatting";
function main() {
  try {
    logger.info("Starting Design Patterns Project");

    // Behavioral Patterns
    logger.info("Executing Observer Use Cases");
    newsPublisherUseCase();
    stockPriceMonitorUseCase();

    logger.info("Executing Strategy Use Cases");
    sortingAlgorithmsUseCase();
    paymentProcessingUseCase();

    // Creational Patterns
    logger.info("Executing Singleton Use Cases");
    configurationManagerUseCase();
    loggerInstanceUseCase();

    logger.info("Executing Factory Use Cases");
    shapeFactoryUseCase();
    notificationFactoryUseCase();

    // Structural Patterns
    logger.info("Executing Adapter Use Cases");
    mediaPlayerAdapterUseCase();
    paymentGatewayAdapterUseCase();

    logger.info("Executing Decorator Use Cases");
    coffeeOrderingSystemUseCase();
    messageFormattingUseCase();

    logger.info("Design Patterns Project Completed Successfully");
  } catch (error) {
    logger.error(`An error occurred: ${(error as Error).message}`);
  }
}

main();
