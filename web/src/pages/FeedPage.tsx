import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFeed from "../hooks/useFeed";
import { EventsActions } from "../redux/EventsSlice";

function FeedPage() {
  useFeed();
  const [events, setEvents] = useState();

  useEffect(() => {});

  return (
    <div className="EventList">
      <h1>events</h1>
      {events.map((event: any) => (
        <div className="event-preview" key={event.id}>
          <h4>{event.eventId.creator}</h4>
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
