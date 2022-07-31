import useEventList from "../hooks/useEventList";
import { errorCheck } from "../utils/error";
import { useSelector } from "react-redux";

function FeedPage() {
  try {
    useEventList().then((events) => {
      console.log(events);
    });
  } catch (err) {
    console.log(err);
  }

  return <div>feed</div>;
}

export default FeedPage;
