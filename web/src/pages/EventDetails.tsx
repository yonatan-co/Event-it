import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { errorCheck } from "../utils/error";
import useDetails from "../hooks/useDetails";

function EventDetails() {
  const event = useDetails();
  console.log(event);
  return (
    <div className="event-details">
      <h1>{event && event.event.title}</h1>
      <h1>bruh</h1>
    </div>
  );
}

export default EventDetails;
