interface TagProperties {
  id?: number;
  name?: string;
}

export default class Tag {
  id;
  name;
  constructor(properties: TagProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || "";
  }
}
