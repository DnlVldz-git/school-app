export interface FileType {
  fileName: string;
  fileUrl: string;
}
interface LessonProperties {
  id?: number;
  unit?: number;
  name?: string;
  description?: string;
  teacherFiles?: FileType[];
  teacherLinks?: string[];
  studentFiles?: FileType[];
  studentLinks?: string[];
  teacherNotes?: string;
  studentNotes?: string;
  fromSessionNumber?: number;
  toSessionNumber?: number;
}

export default class Lesson {
  id;
  unit;
  name;
  description;
  teacherFiles;
  teacherLinks;
  studentFiles;
  studentLinks;
  teacherNotes;
  studentNotes;
  fromSessionNumber;
  toSessionNumber;
  constructor(properties: LessonProperties = {}) {
    this.id = properties.id || -1;
    this.unit = properties.unit || -1;
    this.name = properties.name || "";
    this.description = properties.description || "";
    this.teacherNotes = properties.teacherNotes || "";
    this.studentNotes = properties.studentNotes || "";
    this.teacherFiles = properties.teacherFiles || [];
    this.teacherLinks = properties.teacherLinks || [];
    this.studentFiles = properties.studentFiles || [];
    this.studentLinks = properties.studentLinks || [];
    this.fromSessionNumber = properties.fromSessionNumber || -1;
    this.toSessionNumber = properties.toSessionNumber || -1;
  }
}
