import { TAcademicSemester } from "./academicManagement.type";
import { TStudent } from "./userManagement.type";

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

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
};

export type TStudentOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  __v: number;
  enrolledCourses: string[];
  completedCourses: string[];
  completedCourseIds: string[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
}


export type TEnrolledCourse= {
  _id: string;
  semesterRegistration: TRegisteredSemester | string;
  academicSemester: string;
  academicFaculty: string;
  offeredCourse: string | TOfferedCourse;
  academicDepartment: string;
  course: string;
  faculty: string;
  student: string | TStudent;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  __v: number;
}

export type TCourseMarks= {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
  _id: string;
}
