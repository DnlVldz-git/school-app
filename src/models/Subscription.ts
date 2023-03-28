import Plan from "./Plan";

interface SubscriptionProperties {
  id?: number;
  paypalId?: string;
  expiration?: string;
  plan?: Plan;
}

export default class Subscription {
  id;
  paypalId;
  expiration;
  plan;
  constructor(properties: SubscriptionProperties = {}) {
    this.id = properties.id || -1;
    this.paypalId = properties.paypalId || "XXXXXX";
    this.expiration = properties.expiration || new Date().toISOString();
    this.plan = properties.plan || new Plan();
  }
}
