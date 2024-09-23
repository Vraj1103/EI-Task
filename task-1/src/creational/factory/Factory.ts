import { Product } from "./Product";
import { ConcreteProductA } from "./ConcreteProductA";
import { ConcreteProductB } from "./ConcreteProductB";
import { ConcreteProductC } from "./ConcreteProductC"; // Import the new product
import logger from "../../utils/Logger";
import { AppException } from "../../utils/Exception";

export class Factory {
  static createProduct(type: string): Product {
    switch (type) {
      case "A":
        logger.info("Creating ConcreteProductA");
        return new ConcreteProductA();
      case "B":
        logger.info("Creating ConcreteProductB");
        return new ConcreteProductB();
      case "C":
        logger.info("Creating ConcreteProductC");
        return new ConcreteProductC();
      default:
        logger.error(`Unknown product type: ${type}`);
        throw new AppException(`Unknown product type: ${type}`);
    }
  }
}
