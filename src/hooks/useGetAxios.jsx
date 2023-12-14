import { useState, useEffect } from "react";
import axios from "axios";

const useGetAxios = (url) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await axios.get(url);
        setResponse(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [url]);

  return [response];
};

export default useGetAxios;
