import { useState } from "react";

interface FetchResult<T> {
  data: T | undefined;
  isLoading: boolean;
  errorMessage: string;
  fn: (...args: any[]) => Promise<void>;
}

const useFetch = <T,>(cb: (...args: any[]) => Promise<Response>): FetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fn = async (...args: any[]) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await cb(...args);

      if (!response.ok) {
        throw new Error("Something went wrong, try again later!");
      }

      const responseData: { Response: string; Error?: string; results: T } = await response.json();

      if (responseData.Response === "False") {
        throw new Error(responseData.Error || "Something went wrong, try again later!");
      }

      setData(responseData.results);
    } catch (error) {
      console.error(error);
      const message = (error as Error).message;
      setErrorMessage(message);
      window.alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, errorMessage, fn };
};

export default useFetch;