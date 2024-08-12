import { useState } from "react";
import { toast } from "sonner";
import { TResponse } from "../types/global";


type TToastPromise = (
  promise: (arg: Record<string, unknown>) => Promise<TResponse | unknown>,
  payload: Record<string, unknown>,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => Promise<TResponse | unknown>;



export const useToastPromise = ()=>{

const [result,setResult] = useState<TResponse>({})

const toastPromise: TToastPromise = async (
  promise,
  payload,
  loadingMessage,
  successMessage,
  errorMessage
) => {
 try {
      toast.promise(promise(payload), {
        loading: loadingMessage || "Loading...",
        success: (data: TResponse | unknown) => {
       
          if (typeof data === "object") {
            const responseData = data as TResponse;
            setResult(responseData);
            if (responseData.error) {
              throw new Error(responseData.error.data.message);
            }
            return successMessage || responseData.data.message || "Success";
          }
       
        },
        error: (error: { message: string }) => {
          return errorMessage || error.message || "Something went wrong.";
        },
      });
      return result
    } catch (error) {
      return result;
    }
  }
return { toastPromise };

}



