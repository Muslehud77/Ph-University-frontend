import { useState } from "react";
import { toast } from "sonner";
import { TResponse } from "../types/global.type";

type TToastPromise = (
  promise: (
    arg: Record<string, unknown>
  ) => Promise<TResponse<Record<string, unknown>[]> | unknown>,
  payload: Record<string, unknown>,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => Promise<TResponse<Record<string, unknown>[]> | unknown>;

export const useToastPromise = () => {
  const [result, setResult] = useState<TResponse<Record<string, unknown>[]>>({});

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
        success: (data: TResponse<Record<string, unknown>[]> | unknown) => {
          if (typeof data === "object") {
            const responseData = data as TResponse<Record<string, unknown>[]>;
            setResult(responseData);
            if (responseData.error) {
              throw new Error(responseData.error.data.message);
            }
            return successMessage || responseData?.data?.message || "Success";
          }
        },
        error: (error: { message: string }) => {
          return errorMessage || error.message || "Something went wrong.";
        },
      });
      return result;
    } catch (error) {
      return result;
    }
  };
  return { toastPromise };
};
