import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions) as any;

  if (result?.error?.status === 404) {
   
    // toast.error(result?.error?.data?.message);
  }


  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:7000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const { data } = await res.json();

    const user = (api.getState() as RootState).auth.user;

    const accessToken = data?.accessToken;

    if (accessToken) {
      api.dispatch(
        setUser({
          user,
          token: accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
