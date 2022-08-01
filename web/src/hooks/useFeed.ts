import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { EventsActions } from "../redux/EventsSlice";

const useFeed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/feed/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(EventsActions.fetchEvents(resData));
      });
  }, []);
};

export default useFeed;
