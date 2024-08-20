
import { TQueryParams, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args: TQueryParams) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useCreateStudentMutation,useGetAllStudentsQuery} = userManagementApi