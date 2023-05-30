interface UserProperties {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  email?: string;
  verified?: boolean;
  role?: string;
  refreshToken?: string;
}

export default class User {
  id;
  firstName;
  lastName;
  phone;
  address;
  dateOfBirth;
  email;
  role;
  verified;

  constructor(properties: UserProperties = {}) {
    this.id = properties.id || "";
    this.firstName = properties.firstName || "";
    this.lastName = properties.lastName || "";
    this.phone = properties.phone || "";
    this.address = properties.address || "";
    this.dateOfBirth = properties.dateOfBirth || new Date().toISOString();
    this.email = properties.email || "";
    this.role = properties.role || "";
    this.verified = properties.verified || false;
  }
}
