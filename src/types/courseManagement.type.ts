import { TAcademicSemester } from "./academicManagement.type";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}


export interface TCourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses?: PreRequisiteCourse[];
  isDeleted: boolean;
}

export interface PreRequisiteCourse {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
}


