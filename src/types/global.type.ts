import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data:{
        message:string;
        stack:string;
        success:boolean;
    };
    status:number
}

export type TMeta = {
  total: number;
  pageNumber: number;
  limitDataCount: number;
  totalPage: number;
};


export type TData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};


export type TResponse<T> = {
  data?: TData<T>;
  error?: TError;
};

export type TResponseRedux<T> = TData<T> & BaseQueryApi

export type TQueryParams = { name: string; value: string | number }[];

export type TOptions = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}[];