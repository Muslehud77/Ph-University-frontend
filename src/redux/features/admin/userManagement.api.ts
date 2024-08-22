
import { TAdmin, TFaculty, TQueryParams, TResponseRedux, TStudent } from "../../../types";
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
      providesTags: ["students"],
    }),
    getAllAdmins: builder.query({
      query: (args: TQueryParams) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/admins",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["admins"],
    }),
    getAllFaculties: builder.query({
      query: (args: TQueryParams) => {
        const params = new URLSearchParams();

        if (args?.length) {
          args.map((arg) =>
            params.append(arg.name.toString(), arg.value.toString())
          );
        }

        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["faculties"],
    }),
    getSingleStudent: builder.query({
      query: (_id) => {
        return {
          url: `/students/${_id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (_id) => {
        return {
          url: `/admins/${_id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (_id) => {
        return {
          url: `/faculties/${_id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
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
      invalidatesTags: ["students"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admins"],
    }),
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faculties"],
    }),

    changeUserStatus: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/users/change-status/${_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["students","faculties","admins"],
    }),
  }),
});

export const {useGetSingleFacultyQuery,useGetSingleAdminQuery,useGetAllAdminsQuery,useGetAllFacultiesQuery,useCreateAdminMutation,useCreateFacultyMutation,useChangeUserStatusMutation,useCreateStudentMutation,useGetAllStudentsQuery,useGetSingleStudentQuery} = userManagementApi