import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventsActions } from "../redux/events-slice";

const useFeed = () => {
  let event;
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const globalEvents = useSelector((state: any) => state.events) as [];
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
      })
      .catch((err) => console.log(err));
  }, []);
  return globalEvents;
};

export default useFeed;
