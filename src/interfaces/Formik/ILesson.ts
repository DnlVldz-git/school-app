import Lesson, { FileType } from "models/Lesson";

export interface ILesson {
  id: number;
  unit: number;
  name: string;
  description: string;
  teacherFiles: FileType[];
  teacherLinks: string[];
  studentFiles: FileType[];
  studentLinks: string[];
  teacherNotes: string;
  studentNotes: string;
  fromSessionNumber: number;
  toSessionNumber: number;
}

export const LessonInitial: ILesson = {
  id: -1,
  unit: -1,
  name: "",
  description: "",
  teacherFiles: [],
  teacherLinks: [],
  studentFiles: [],
  studentLinks: [],
  teacherNotes: "",
  studentNotes: "",
  fromSessionNumber: 1,
  toSessionNumber: 1,
};

export const LessonFilled = (lesson: Lesson) => {
  const lessonFormik = { ...lesson };

  if (lessonFormik.teacherNotes === "N/A") {
    lessonFormik.teacherNotes = "";
  }

  if (lessonFormik.studentNotes === "N/A") {
    lessonFormik.studentNotes = "";
  }

  return lessonFormik;
};
