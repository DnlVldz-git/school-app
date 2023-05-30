interface LevelProperties {
  id?: number;
  name?: string;
  description?: string;
}

export default class Level {
  id;
  name;
  description;
  constructor(properties: LevelProperties = {}) {
    this.id = properties.id || -1;
    this.name = properties.name || 'Sunt amet';
    this.description = properties.description || 'Lorem ipsum dolor sit amet';
  }
}
