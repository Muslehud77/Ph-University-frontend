import { z } from "zod";

export const createAcademicSemesterSchema = z.object({
  code: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select start month" }),
  endMonth: z.string({ required_error: "Please select end month" }),
});
