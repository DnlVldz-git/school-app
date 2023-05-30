import Lesson from "models/Lesson";
import Session from "models/Session";
import Student from "models/Student";
import Teacher from "models/Teacher";

export interface ITeacherSession {
  name: string;
  teacherId: string;
  userId: string;
  email: string;
}

export interface IStudentSession {
  name: string;
  studentId: string;
  userId: string;
}

export interface ISession {
  id?: number;
  duration: number;
  sessionDate: string;
  zoomKey?: string;
  isFirst?: boolean;
  teacherId?: string;
  studentId?: string;
  student?: Student | IStudentSession;
  teacher?: Teacher | ITeacherSession;
  sessionNumber?: number;
  lessons?: Lesson[];
  availableCredits?: number;
}

export const SessionInitial: ISession = {
  id: -1,
  zoomKey: "",
  duration: 0,
  sessionDate: "",
  isFirst: false,
  student: {} as IStudentSession,
  teacher: {} as ITeacherSession,
  sessionNumber: -1,
  availableCredits: -1,
};

export const SessionFilled = (session: Session) => {
  const sessionFormik = { ...session };
  return sessionFormik;
};
