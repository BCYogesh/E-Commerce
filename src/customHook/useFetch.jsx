import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status : ${res.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useFetch;
