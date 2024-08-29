import {
  TQueryParams,
  TResponseRedux,
  TStudentOfferedCourse,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TStudentOfferedCourse[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["myOfferedCourses"],
    }),

    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["myOfferedCourses"],
    }),
  }),
});

export const {useEnrollCourseMutation, useGetMyOfferedCoursesQuery } = studentCourseManagementApi;
