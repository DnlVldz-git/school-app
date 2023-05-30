import { IEventuality, ISchedule } from "interfaces/ICalendar";

import User from "./User";
import Level from "./Level";

interface TeacherProperties {
  id?: string;
  license?: string;
  levels?: Level[];
  eventualities?: IEventuality[];
  schedule?: ISchedule[];
  user?: User;
}

export default class Teacher {
  id;
  levels;
  license;
  user;
  schedule;
  eventualities;
  constructor(properties: TeacherProperties = {}) {
    this.id = properties.id || "";
    this.user = properties.user || new User();
    this.license = properties.license || "00000000";
    this.schedule = properties.schedule || [];
    this.levels = properties.levels || [];
    this.eventualities = properties.eventualities || [];
  }
}
