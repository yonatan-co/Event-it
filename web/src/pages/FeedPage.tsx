import useFeed from "../hooks/useFeed";
import { Link } from "react-router-dom";

import EventList from "../components/EventList";
import Navbar from "../components/Navbars/AuthNavbar";

export function FeedPage() {
  const { events, error, isPending } = useFeed();

  return (
    <div className="event-list">
      <Navbar />
      <EventList />;
    </div>
  );
}

export default FeedPage;
