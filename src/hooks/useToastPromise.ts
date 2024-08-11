import { useState } from "react";
import { toast } from "sonner";


type TToastPromise = ( promise: (arg: Record<string, unknown>) => Promise<unknown>,
  payload: Record<string, unknown>,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string,) => Promise<unknown>



export const useToastPromise = ()=>{

const [result,setResult] = useState<Record<string,unknown>>({})

const toastPromise: TToastPromise = async (
  promise,
  payload,
  loadingMessage,
  successMessage,
  errorMessage
) => {
 try {
      toast.promise(
        promise(payload),  
        {
          loading: loadingMessage || "Loading...",
          success: (data: any) => {
            setResult(data);
            if (data?.error) {
              throw new Error(data.error.data.message);
            }
            return successMessage || data.data.message || "Success";
          },
          error: (error: any) => {
            return errorMessage || error.message || "Something went wrong.";
          },
        }
      );
      return result
    } catch (error) {
      // Handle any additional errors here if needed
    }
  }
return { toastPromise };

}



