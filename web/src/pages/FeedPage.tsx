import useFeed from "../hooks/useFeed";

function FeedPage() {
  const { events } = useFeed();
  return (
    <div className="homepage">
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
