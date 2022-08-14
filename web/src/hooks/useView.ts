import { useState, useEffect } from "react";

type EventData = {
  event: {
    _id: string;
    title: string;
    descraption: string;
    creator: string;
    photos: [];
  };
};

const useView = (
  id: string | undefined
): { data: EventData | null; isPending: boolean; error: Error | null } => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch("http://localhost:8080/feed/events/" + id, {
        method: "GET",
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
  }, [data]);

  return { data, isPending, error };
};

export default useView;
