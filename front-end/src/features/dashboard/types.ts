export type Event = "SIGNUP" | "SIGNIN";

export type SignupMetadata = {
  email: string;
  username: string;
  signupSource: "WEB" | "MOBILE" | "REFERRAL";
};

export type SigninMetadata = {
  ipAddress: string;
  device: "MOBILE" | "DESKTOP" | "TABLET";
  location: {
    latitude: number;
    longitude: number;
  };
};

export type PurchaseMetadata = {
  orderId: string;
  amount: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: "CREDIT_CARD" | "PAYPAL" | "BANK_TRANSFER";
};

export type Activity =
  | {
      event: "SIGNUP";
      timestamp: Date;
      userId: string;
      metadata: SignupMetadata;
    }
  | {
      event: "SIGNIN";
      timestamp: Date;
      userId: string;
      metadata: SigninMetadata;
    }
  | {
      event: "PURCHASE";
      timestamp: Date;
      userId: string;
      metadata: PurchaseMetadata;
    };
