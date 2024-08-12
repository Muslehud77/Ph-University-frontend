import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse:(response)=>{
        console.log("inside redux")
        return response
      }
    }),
    createAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-semester",
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {useGetAllSemestersQuery,useCreateAcademicSemestersMutation} = academicManagementApi