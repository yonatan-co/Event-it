import useFeed from "../hooks/useFeed";

function FeedPage() {
  const { events, error, isPending } = useFeed();

  return (
    <div className="homepage">
      <h1>events</h1>
      {isPending && <div>Loading</div>}
      {events &&
        events.map((event: any) => (
          <div className="event-preview" key={event._id}>
            <h4>{event.eventId.title}</h4>
            <h4>{event.userId}</h4>
          </div>
        ))}
      {error.message && <h2>{error.message}</h2>}
    </div>
  );
}

export default FeedPage;
