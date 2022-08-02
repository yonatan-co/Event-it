import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../redux/auth-slice";
import { EventsActions } from "../redux/events-slice";

function FeedPage() {
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
        return resData;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="EventList">
      <h1>events</h1>
      {globalEvents &&
        globalEvents.map((event: any) => (
          <div className="event-preview" key={event._id}>
            <h4>{event.eventId.title}</h4>
            <h4>{event.userId}</h4>
          </div>
        ))}
    </div>
  );
}

export default FeedPage;
