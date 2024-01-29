import { useEffect, useState } from "react";

interface returnValue {
  isFetching: boolean;
  data: {} | {}[] | undefined;
  error: { message: ""; error: boolean } | undefined;
  setData: (value: any) => void;
}

interface IUseCustomFetch {
  fetchFunction: () => Promise<any>;
  initialValue?: {} | {}[];
}

const useCustomFetch = ({
  fetchFunction,
  initialValue,
}: IUseCustomFetch): returnValue => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<{ message: ""; error: boolean }>();
  const [fetchedData, setFetchedData] = useState<{} | {}[]>(initialValue ?? {});

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchedData(data);
      } catch (error: any) {
        setError({
          message: error.message || "Failed to fetch data.",
          error: true,
        });
      }
      setIsFetching(false);
    };
    fetch();
  }, [fetchFunction]);
  return {
    isFetching: isFetching,
    data: fetchedData,
    error: error,
    setData: setFetchedData,
  };
};
export default useCustomFetch;
