import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../redux/AuthSlice";
import { EventsActions } from "../redux/EventsSlice";

function FeedPage() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
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
      setEvents(resData.events);
    });

  return (
    <div className="EventList">
      <h1>events</h1>
      {events &&
        events.map((event: any) => (
          <div className="event-preview" key={event._id}>
            <h4>{event.eventId.title}</h4>
            <h4>{event.userId}</h4>
          </div>
        ))}
    </div>
  );
}

export default FeedPage;
