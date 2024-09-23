import { Target } from "./Target";
import { Adaptee } from "./Adaptee";
import { Adapter } from "./Adapter";

interface PaymentGateway {
  processPayment(amount: number): void;
}

class PayPalService {
  executePayment(amount: number): void {
    console.log(`Processed payment of ${amount} via PayPal.`);
  }
}

class PayPalAdapter implements Target, PaymentGateway {
  private payPalService: PayPalService;

  constructor() {
    this.payPalService = new PayPalService();
  }

  request(): void {
    this.payPalService.executePayment(100);
  }

  processPayment(amount: number): void {
    this.payPalService.executePayment(amount);
  }
}

export function paymentGatewayAdapterUseCase() {
  const paymentGateway: PaymentGateway = new PayPalAdapter();
  paymentGateway.processPayment(250); // Processed payment of 250 via PayPal.
}
