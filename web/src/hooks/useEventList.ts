import { useSelector } from "react-redux";
import { errorCheck } from "../utils/error";

const useEventsList = async () => {
  try {
    const token = useSelector((state: any) => state.token);
    console.log(token);
    const res = await fetch("http://localhost:8080/feed/events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const error = errorCheck(res);
    if (error) {
      throw error;
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export default useEventsList;
