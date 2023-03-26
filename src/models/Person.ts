interface PersonProperties {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export default class Person {
  id;
  firstName;
  lastName;
  phone;
  address;
  constructor(properties: PersonProperties = {}) {
    this.id = properties.id || -1;
    this.firstName = properties.firstName || "Accelerate";
    this.lastName = properties.lastName || "Ed";
    this.phone = properties.phone || "7229807997";
    this.address = properties.address || "No addres";
  }
}
