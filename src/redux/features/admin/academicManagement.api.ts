import { TData } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse:(response)=>{
        const data = response as unknown as TData
      
        return {
            data:data.data,
            meta:data.meta
        }
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