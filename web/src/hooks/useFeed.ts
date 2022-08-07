import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsActions } from "../redux/events-slice";

const useFeed = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(Error(undefined));
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events) as [];
  const nevigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:8080/feed/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          nevigate("/login");
        }
        if (!res.ok) {
          throw new Error("failed to load the feed");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        dispatch(EventsActions.fetchEvents(data.events));
        setError(Error(undefined));
      })
      .catch((err: Error) => {
        setIsPending(false);
        setError(err);
        // console.log(err)
      });
  }, []);
  return { events, isPending, error };
};

export default useFeed;
