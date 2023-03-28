import Teacher from "./Teacher";

interface SessionProperties {
  id?: number;
  zoomKey?: string;
  duration?: number;
  sessionDate?: string;
  isFirst?: boolean;
  teacher?: Teacher;
}

export default class Session {
  id;
  zoomKey;
  duration;
  sessionDate;
  isFirst;
  teacher;
  constructor(properties: SessionProperties = {}) {
    this.id = properties.id || -1;
    this.zoomKey = properties.zoomKey || "XXXXXX";
    this.duration = properties.duration || 0;
    this.sessionDate = properties.sessionDate || new Date().toISOString();
    this.isFirst = properties.isFirst || false;
    this.teacher = properties.teacher || new Teacher();
  }
}
