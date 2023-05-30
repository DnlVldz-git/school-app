import Plan from "./Plan";
import Student from "./Student";

interface SubscriptionProperties {
  id?: string;
  paypalId?: string;
  start?: string;
  expiration?: string;
  status?: boolean;
  plan?: Plan;
  student?: Student;
  availableCredits?: number;
}

export default class Subscription {
  id;
  paypalId;
  start;
  expiration;
  status;
  plan;
  student;
  availableCredits;

  constructor(properties: SubscriptionProperties = {}) {
    this.id = properties.id || "";
    this.paypalId = properties.paypalId || "XXXXXX";
    this.status = properties.status || false;
    this.start = properties.start || new Date().toISOString();
    this.expiration = properties.expiration || new Date().toISOString();
    this.plan = properties.plan || new Plan();
    this.student = properties.student || new Student();
    this.availableCredits = properties.availableCredits || -1;
  }
}
