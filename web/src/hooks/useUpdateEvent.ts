import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventRequestBody } from "../types/types";

const useUpdateEvent = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(new Error(undefined));
  const [data, setData] = useState();
  const updateEvent = async (
    id: string | undefined,
    body: EventRequestBody
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/feed/update/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("failed to update the event");
      }
      const resData = await res.json();
      setData(resData);

      navigate("/feed");
      return { data, isPending, error };
    } catch (err: any) {
      setIsPending(false);
      setError(err);
      return { data, error, isPending };
    }
  };
  return updateEvent;
};

export default useUpdateEvent;
