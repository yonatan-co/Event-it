import useFeed from "../hooks/useFeed";

function FeedPage() {
  const globalEvents = useFeed();
  useFeed();
  return (
    <div className="event-preview">
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
