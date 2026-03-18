import { useEffect, useState } from "react";

export const useAccount = <T>(apiFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await apiFn();
        if (isActive) {
          setData(response);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isActive = false;
    };
  }, [apiFn]);

  return { data, isLoading };
};
