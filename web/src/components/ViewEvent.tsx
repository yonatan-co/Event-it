import { useParams } from "react-router-dom";
import useView from "../hooks/useView";

function ViewEvent() {
  const { id } = useParams();
  const { data, isPending, error } = useView(id);
  console.log(data);
  return (
    <div className="view-event">
      <h1>{data && data.event.title}</h1>
    </div>
  );
}

export default ViewEvent;
