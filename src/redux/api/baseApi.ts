import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000/api/v1" }),
  endpoints: (builder)=>({
    login : builder.mutation({
        query: (userInfo)=>({
            url: '/auth/login',
            method: 'POST',
            body: userInfo
        })
    })
  })
});