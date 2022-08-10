import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EventsActions } from "../redux/events-slice";

const useDelete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events);
  const token = localStorage.getItem("token");
  const deleteEvent = async (id: string | undefined) => {
    try {
      const res = await fetch("http://localhost:8080/feed/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!res.ok) {
        throw new Error("something went wrong, please try again later");
      }
      const updateEvents = events.filter((event: any) => event._id === id);
      console.log(updateEvents);
      dispatch(EventsActions.fetchEvents(updateEvents));
    } catch (error) {
      console.log(error);
    }
  };
  return deleteEvent;
};

export default useDelete;
