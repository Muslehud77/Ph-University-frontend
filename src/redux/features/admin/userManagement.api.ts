import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllSemesters: builder.query({
    //   query: (args: TQueryParams) => {
    //     const params = new URLSearchParams();

    //     if (args?.length) {
    //       args.map((arg) =>
    //         params.append(arg.name.toString(), arg.value.toString())
    //       );
    //     }

    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useCreateStudentMutation} = userManagementApi