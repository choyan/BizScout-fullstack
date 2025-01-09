import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Event } from '@prisma/client';

@Injectable()
export class FakerService {
  generateBaseEvent(event: Event) {
    return {
      event,
      userId: faker.database.mongodbObjectId(),
      timestamp: new Date().toISOString(),
      metadata: {},
    };
  }

  generateSignupEvent() {
    const base = this.generateBaseEvent('SIGNUP');
    base.metadata = {
      email: faker.internet.email(),
      username: faker.person.fullName(),
      signupSource: faker.helpers.arrayElement(['WEB', 'MOBILE', 'REFERRAL']),
    };
    return base;
  }

  generateSigninEvent() {
    const base = this.generateBaseEvent('SIGNIN');
    base.metadata = {
      ipAddress: faker.internet.ip(),
      device: faker.helpers.arrayElement(['MOBILE', 'DESKTOP', 'TABLET']),
      location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    };
    return base;
  }

  generatePurchaseEvent() {
    const base = this.generateBaseEvent('PURCHASE');
    base.metadata = {
      orderId: faker.database.mongodbObjectId(),
      amount: faker.finance.amount({ min: 10, max: 500 }),
      items: Array.from({
        length: faker.number.int({ min: 1, max: 5 }),
      }).map(() => ({
        productId: faker.database.mongodbObjectId(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: faker.finance.amount({ min: 5, max: 100 }),
      })),
      paymentMethod: faker.helpers.arrayElement([
        'CREDIT_CARD',
        'PAYPAL',
        'BANK_TRANSFER',
      ]),
    };
    return base;
  }

  generateRandomEvent() {
    const events = [
      this.generateSignupEvent(),
      this.generateSigninEvent(),
      this.generatePurchaseEvent(),
    ];
    return faker.helpers.arrayElement(events);
  }
}
