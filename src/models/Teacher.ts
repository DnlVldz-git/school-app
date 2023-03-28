import User from "./User";

interface TeacherProperties {
  id?: string;
  license?: string;
  user?: User;
}

export default class Teacher {
  id;
  license;
  user;
  constructor(properties: TeacherProperties = {}) {
    this.id = properties.id || -1;
    this.license = properties.license || "00000000";
    this.user = properties.user || new User();
  }
}
