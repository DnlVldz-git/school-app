import User from "./User";
import Session from "./Session";

interface StudentProperties {
  id?: string;
  level?: string;
  user?: User;
  sessions?: Session[];
}

export default class Student {
  id;
  level;
  user;
  sessions;
  constructor(properties: StudentProperties = {}) {
    this.id = properties.id || "";
    this.level = properties.level || "";
    this.user = properties.user || new User();
    this.sessions = properties.sessions || new Array<Session>();
  }
}
