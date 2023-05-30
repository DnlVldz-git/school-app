import { IUser, UserInitial } from "./IUser";
import Student from "models/Student";

export interface IStudent extends IUser {
  userId: string;
  studentId: string;
  level: string;
}

export const StudentInitial: IStudent = {
  ...UserInitial,
  userId: "",
  studentId: "",
  level: "",
};

export const StudentFilled = (student: Student) => {
  const definedStudent = new Student({ ...student });

  const studentFormik: IStudent = {
    ...definedStudent.user,
    password: "",
    userId: definedStudent.user.id,
    studentId: definedStudent.id,
    level: definedStudent.level,
  };

  return studentFormik;
};

export const StudentWithoutPassword = (student: IStudent) => {
  if (student.password.length === 0) {
    const { password, ...studentWithoutPassword } = student;
    return studentWithoutPassword;
  }

  return student;
};
