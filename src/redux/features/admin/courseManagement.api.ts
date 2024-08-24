import {
  TQueryParams,
  TResponseRedux,

 
  TRegisteredSemester,
  TCourse,
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

    updateRegisteredSemester: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/semester-registrations/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["registeredSemesters"],
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
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
 useUpdateRegisteredSemesterMutation, useCreateSemesterMutation,useGetAllRegisteredSemesterQuery
} = courseManagement;
