import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EventsActions } from "../redux/events-slice";

import { DeleteTarget } from "../types/types";

const useDelete = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events);
  const token = localStorage.getItem("token");
  const deleteItem = async (id: string | undefined, target: DeleteTarget) => {
    try {
      const res = await fetch(`http://localhost:8080/${target}/delete/` + id, {
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
  return deleteItem;
};

export default useDelete;
