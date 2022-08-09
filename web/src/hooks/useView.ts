import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "../redux/details-slice";

import { EventState } from "../types/states";

const useDetails = (id: string | undefined) => {
  // const [data, setData] = useState<EventState>();
  const dispatch = useDispatch();
  const details = useSelector((state: any) => state.details);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:8080/feed/events/" + id, {
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
        // setData(data);
        dispatch(detailsActions.setDetails(data));
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return { data: details, isPending, error };
};

export default useDetails;