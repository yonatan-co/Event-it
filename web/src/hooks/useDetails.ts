import { useState, useEffect } from "react";

import { EventState } from "../types/states";

const useDetails = () => {
  const [data, setData] = useState<EventState>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch("http://localhost:8080/feed/events/62e79d84124c12e383484567", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  return { data, isPending, error };
};

export default useDetails;