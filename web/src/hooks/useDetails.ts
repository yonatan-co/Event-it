import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { errorCheck } from "../utils/error";

const useDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({ title: "" });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:8080/feed/events/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        const error = errorCheck(res);
        if (error) {
          throw new Error("failed to fetch that resorce!!!!");
        }
        return res.json();
      })
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
        console.log(err);
      });
    return () => abortController.abort();
  });
  return { event };
};

export default useDetails;
