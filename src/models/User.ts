import Person from "./Person";
import Role from "./Role";

interface UserProperties {
  id?: number;
  email?: string;
  password?: string;
  verified?: boolean;
  code?: string;
  role?: Role;
  person?: Person;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class User {
  id;
  email;
  password = "";
  verified = false;
  code;
  role;
  person;
  createdAt;
  updatedAt;

  constructor(properties: UserProperties = {}) {
    this.id = properties.id || -1;
    this.email = properties.email || "";
    this.role = properties.role || new Role();
    this.person = properties.person || new Person();
    this.verified = properties.verified || false;
    this.code = properties.code || "";
    this.createdAt = properties.createdAt || new Date();
    this.updatedAt = properties.updatedAt || new Date();
  }
}
