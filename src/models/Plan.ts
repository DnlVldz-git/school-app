interface PlanProperties {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  paypalId?: string;
  expirationDate?: string;
}

export default class Plan {
  id;
  name;
  description;
  price;
  paypalId;
  expirationDate;
  constructor(properties: PlanProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "Finibus Bonorum";
    this.description = properties.description || "Lorem ipsum dolor sit amet";
    this.price = properties.price || 0;
    this.paypalId = properties.paypalId || "XXXXXX";
    this.expirationDate = properties.expirationDate || new Date().toISOString();
  }
}
