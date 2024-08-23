import {
  TQueryParams,
  TResponseRedux,

 
  TRegisteredSemester,
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
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSemesterMutation,useGetAllRegisteredSemesterQuery
} = courseManagement;
