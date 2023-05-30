import Subscription from "models/Subscription";

export interface ISubscription {
  id: number;
  paypalId: string;
  start: string;
  expiration: string;
  status: boolean;
  studentId: string;
  planId: number;
  availableCredits: number;
}

export const SubscriptionInitial: ISubscription = {
  id: -1,
  paypalId: "",
  start: "",
  expiration: "",
  status: true,
  studentId: "",
  planId: -1,
  availableCredits: -1,
};

export const SubscriptionFilled = (subscription: Subscription) => {
  const subscriptionFormik = { ...subscription };
  return subscriptionFormik;
};
