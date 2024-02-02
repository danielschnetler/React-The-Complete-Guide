import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url: string, config: {}) => {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message ?? "Something went wrong, failed to send the request"
    );
  }
  return resData;
};

export default function useHttp(url: string, config?: {}, initialData?: any) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<{}>();

  const sendRequest = useCallback(
    async (url: string, config: {}) => {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error?.message ?? "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  const clearData = () => {
    setData(initialData);
  };

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest(url, config);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
