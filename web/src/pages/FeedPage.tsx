import useFeed from "../hooks/useFeed";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbars/MainNavbar";

import EventList from "../components/EventList";

export function FeedPage() {
  return (
    <>
      <Navbar />
      <EventList />
    </>
  );
}

export default FeedPage;
