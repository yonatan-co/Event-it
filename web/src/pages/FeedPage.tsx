import { useEffect, useState } from "react";

function FeedPage() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  let test = [];
  useEffect(() => {
    fetch("http://localhost:8080/feed/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resData) => {
        test = [{ _id: "3242", title: "sdgs" }];
        console.log(resData.events);
        setEvents(resData.events);
      });
  }, []);
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
