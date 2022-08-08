import { Link } from "react-router-dom";

import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButtonForm";

import useFeed from "../hooks/useFeed";

function FeedPage() {
  const { events, error, isPending } = useFeed();

  return (
    <div className="homepage">
      {isPending && <div>Loading</div>}
      {events && events.length > 0 && <h1>events</h1>}
      {events &&
        events.map((event: any) => (
          <div className="event-preview" key={event._id}>
            <h4>{event.eventId.title}</h4>
            <h4>{event.userId}</h4>
            <DeleteButton id={event.eventId._id.toString()} />
            <EditButton id={event.eventId._id.toString()} />
          </div>
        ))}
      {error.message && (
        <div className="error">
          <h2>{error.message}</h2>
          <Link to={"/login"}> go back to login</Link>
        </div>
      )}
    </div>
  );
}

export default FeedPage;
