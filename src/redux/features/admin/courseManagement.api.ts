import {
  TQueryParams,
  TResponseRedux,

 
  TRegisteredSemester,
  TCourse,
  TOfferedCourse,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["registeredSemesters"],
    }),
    getAllCourses: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["registeredSemesters"],
    }),
    getAllOfferedCourses: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourse"],
    }),

    getAssignedFaculties: builder.query({
      query: (courseId: string) => {
        return {
          url: `/courses/${courseId}/get-faculties`,
          method: "GET",
        };
      },
      providesTags: ["assignedFaculties"],
    }),

    updateAssignedFaculties: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/courses/${_id}/assign-faculties`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["assignedFaculties"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/semester-registrations/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["registeredSemesters"],
    }),
    updateCourse: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/courses/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["registeredSemesters"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses", "assignedFaculties"],
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  useCreateOfferedCourseMutation,
  useUpdateAssignedFacultiesMutation, 
  useGetAssignedFacultiesQuery,
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useUpdateRegisteredSemesterMutation,
  useCreateSemesterMutation,
  useGetAllRegisteredSemesterQuery,
} = courseManagement;
