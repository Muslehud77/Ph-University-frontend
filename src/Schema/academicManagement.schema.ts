import { z } from "zod";

export const createAcademicSemesterSchema = z.object({
  code: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select start month" }),
  endMonth: z.string({ required_error: "Please select end month" }),
});

export const createAcademicFacultySchema = z.object({
  name: z.string({ required_error: "Please input the name of Faculty" }),
});


export const createAcademicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please input a Name of a department" }),
  academicFaculty: z.string({ required_error: "Please select a Faculty" }),
});
