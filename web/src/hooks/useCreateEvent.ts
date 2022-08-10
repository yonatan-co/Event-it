import { useState } from "react";
import { EventRequestBody } from "../types/types";

const useCreateEvent = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const token = localStorage.getItem("token");

  const createEvent = async (body: EventRequestBody) => {
    console.log(token);
    try {
      const res = await fetch("http://localhost:8080/feed/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("cannot create event");
      }
      const data = await res.json();
      setData(data);
      return { data, error, isPending };
    } catch (error: any) {
      setIsPending(false);
      setError(error);
      console.log(error);
      return { data, error, isPending };
    }
  };
  return createEvent;
};

export default useCreateEvent;
