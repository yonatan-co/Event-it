import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { EventsActions } from "../redux/events-slice";

const useFeed = () => {
  const dispatch = useDispatch();
  const globalEvents = useSelector((state: any) => state.events) as [];
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
      .then((resData) => {
        dispatch(EventsActions.fetchEvents(resData.events));
        console.log(globalEvents);
      })
      .catch((err) => console.log(err));
  }, []);
  return globalEvents;
};

export default useFeed;
