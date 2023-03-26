interface RoleProperties {
  id?: number;
  name?: string;
  permits?: string[];
}

export default class Role {
  id;
  name;
  permits;
  constructor(properties: RoleProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "Usuario";
    this.permits = properties.permits || [];
  }
}
