import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventsActions } from "../redux/events-slice";

const useFeed = () => {
  let event;
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events) as [];
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
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        dispatch(EventsActions.fetchEvents(data.events));
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err);
        // console.log(err)
      });
  }, []);
  return { events, isPending, error };
};

export default useFeed;
