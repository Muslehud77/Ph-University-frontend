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


export type TData = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: Record<string,unknown>[];
};


export type TResponse = {
  data?: TData;
  error?: TError;
};