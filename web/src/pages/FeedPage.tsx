import EventsList from "../components/EventList";
import { errorCheck } from "../utils/error";
import { useSelector } from "react-redux";

async function FeedPage() {
  try {
    const token = useSelector((state: any) => state.token);
    const res = await fetch("http://localhost:8080/events", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    errorCheck(res);
    const resData = await res.json();
    console.log(resData);
  } catch (err) {
    console.log(err);
  }
}

export default FeedPage;
