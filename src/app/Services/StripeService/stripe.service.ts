import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripe!: Stripe;
  elements!: StripeElements;

  constructor() {
    this.loadStripe();
  }

  private async loadStripe() {
    const stripe = await loadStripe('pk_test_51MqCtqISx4MTSLMlVVpkI3fE9NhjgDYP3kcDuOr84ycqWXwzV2Y9HjqeFr4InYftwnspqKz12iFsZM33vOvFeVKw000Qqa3IQo');
    this.stripe = stripe!;
    this.elements = this.stripe.elements();
  }

  createCardElement(): StripeElement {
    if (!this.stripe) {
      throw new Error('Stripe is not initialized yet.');
    }
    return this.elements.create('card');
  }

  async createToken(cardElement: StripeElement): Promise<{ token?: any; error?: any }> {
    if (!this.stripe) {
      throw new Error('Stripe is not initialized yet.');
    }

    const result = await this.stripe.createToken(cardElement as any);
    return result;
  }
}
