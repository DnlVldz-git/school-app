import Plan from "models/Plan";

export interface IPlan {
  id: number;
  name: string;
  status: boolean;
  description: string;
  price: number;
  paypalId: string;
  credits: number;
}

export const PlanInitial: IPlan = {
  id: -1,
  name: "",
  status: false,
  description: "",
  price: 0,
  paypalId: "",
  credits: -1,
};

export const PlanFilled = (plan: Plan) => {
  const planFormik: IPlan = { ...plan };
  return planFormik;
};
