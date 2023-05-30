import Teacher from "models/Teacher";

import { IEventuality, ISchedule } from "../ICalendar";
import { IUser, UserInitial } from "./IUser";

export interface ITeacher extends IUser {
  userId: string;
  teacherId: string;
  license: string;
  levels: number[];
  eventualities: IEventuality[];
  schedule: ISchedule[];
}

export const TeacherInitial: ITeacher = {
  ...UserInitial,
  userId: "",
  teacherId: "",
  license: "",
  levels: [],
  eventualities: [],
  schedule: [],
};

export const TeacherFilled = (teacher: Teacher) => {
  const definedTeacher = new Teacher({ ...teacher });
  const teacherLevels = definedTeacher.levels.map((level) => {
    return level.id;
  });

  const teacherFormik: ITeacher = {
    ...definedTeacher.user,
    password: "",
    levels: teacherLevels,
    userId: definedTeacher.user.id,
    teacherId: definedTeacher.id,
    license: definedTeacher.license,
    schedule: definedTeacher.schedule,
    eventualities: definedTeacher.eventualities,
  };

  return teacherFormik;
};
