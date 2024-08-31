import {

  TQueryParams,
  TResponseRedux,
 
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrolledCourses: builder.query({
      query: (args: TQueryParams | undefined) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["myOfferedCourses", "myEnrolledCourses"],
    }),

    updateMarks: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["myOfferedCourses", "myEnrolledCourses"],
    }),
  }),
});

export const { useGetEnrolledCoursesQuery,useUpdateMarksMutation } = facultyCourseManagementApi;
