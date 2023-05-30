interface RoleProperties {
  id?: number;
  name?: string;
  description?: string;
}

export default class Role {
  id;
  name;
  description;
  constructor(properties: RoleProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "";
    this.description = properties.description || "";
  }
}
