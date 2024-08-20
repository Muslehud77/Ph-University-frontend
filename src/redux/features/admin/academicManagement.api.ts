import {
  TQueryParams,
  TResponseRedux,
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types";
import { baseApi } from "../../api/baseApi";






const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllAcademicDepartments: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/academic-departments",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllAcademicFaculties: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-semester",
        method: "POST",
        body: data,
      }),
    }),
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateAcademicSemestersMutation,useCreateAcademicDepartmentMutation,useCreateAcademicFacultyMutation,useGetAllAcademicDepartmentsQuery,useGetAllAcademicFacultiesQuery } =
  academicManagementApi;
