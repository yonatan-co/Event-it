import useFeed from "../hooks/useFeed";
import { Link } from "react-router-dom";

import EventList from "../components/EventList";

export function FeedPage() {
  const { events, error, isPending } = useFeed();

  return <EventList />;
}

export default FeedPage;
