import logger from "../../utils/Logger";
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card.`);
    logger.info(`Payment of ${amount} processed via Credit Card.`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
    logger.info(`Payment of ${amount} processed via PayPal.`);
  }
}

export class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
    logger.info("Payment strategy set.");
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
    logger.info("Payment strategy updated.");
  }

  executePay(amount: number) {
    logger.info(`Executing payment of ${amount}...`);
    this.strategy.pay(amount);
  }
}

export function paymentProcessingUseCase() {
  const paymentContext = new PaymentContext(new CreditCardPayment());
  paymentContext.executePay(100); // Paid 100 using Credit Card.

  paymentContext.setStrategy(new PayPalPayment());
  paymentContext.executePay(200); // Paid 200 using PayPal.
}
