interface UnitProperties {
  id?: number;
  name?: string;
  level?: string;
}

export default class Unit {
  id;
  name;
  level;
  constructor(properties: UnitProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "";
    this.level = properties.level || "";
  }
}
