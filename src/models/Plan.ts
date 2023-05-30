interface PlanProperties {
  id?: number;
  name?: string;
  description?: string;
  status?: boolean;
  price?: number;
  paypalId?: string;
  credits?: number;
}

export default class Plan {
  id;
  name;
  description;
  status;
  price;
  paypalId;
  credits;
  constructor(properties: PlanProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "Finibus Bonorum";
    this.description = properties.description || "Lorem ipsum dolor sit amet";
    this.status = properties.status || false;
    this.price = properties.price || 0;
    this.paypalId = properties.paypalId || "XXXXXX";
    this.credits = properties.credits || -1;
  }
}
