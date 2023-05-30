import { IStudentSession, ITeacherSession } from "interfaces/Formik/ISession";

import Teacher from "./Teacher";
import Student from "./Student";
import Lesson from "./Lesson";

interface SessionProperties {
  id?: number;
  zoomMeetingId?: string;
  zoomMeetingPwd?: string;
  duration?: number;
  sessionDate?: string;
  isFirst?: boolean;
  teacher?: Teacher | ITeacherSession;
  student?: Student | IStudentSession;
  lessons?: Lesson[];
}

export default class Session {
  id;
  zoomMeetingId;
  zoomMeetingPwd;
  duration;
  sessionDate;
  isFirst;
  teacher;
  student;
  lessons;
  constructor(properties: SessionProperties = {}) {
    this.id = properties.id || -1;
    this.zoomMeetingId = properties.zoomMeetingId || "";
    this.zoomMeetingPwd = properties.zoomMeetingPwd || "";
    this.duration = properties.duration || 0;
    this.sessionDate = properties.sessionDate || new Date().toISOString();
    this.isFirst = properties.isFirst || false;
    this.teacher = properties.teacher || {};
    this.student = properties.student || {};
    this.lessons = properties.lessons || [];
  }
}
