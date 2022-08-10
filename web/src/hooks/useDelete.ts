import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EventsActions } from "../redux/events-slice";

const useDelete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(EventsActions.deleteEvent(id));
    } catch (error) {
      navigate("/feed");
      console.log(error);
    }
  };
  return deleteEvent;
};

export default useDelete;
