import Person from "./Person";
import Role from "./Role";

interface UserProperties {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  email?: string;
  verified?: boolean;
  role?: Role;
}

export default class User {
  id;
  firstName;
  lastName;
  phone;
  address;
  dateOfBirth;
  email;
  verified = false;
  role;

  constructor(properties: UserProperties = {}) {
    this.id = properties.id || "";
    this.firstName = properties.firstName || "Accelerate";
    this.lastName = properties.lastName || "Ed";
    this.phone = properties.phone || "7229807997";
    this.address = properties.address || "No address";
    this.dateOfBirth = properties.dateOfBirth || new Date().toISOString();
    this.email = properties.email || "";
    this.role = properties.role || new Role();
    this.verified = properties.verified || false;
  }
}
