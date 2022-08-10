import { useParams, Link } from "react-router-dom";
import useView from "../hooks/useView";

function ViewEvent() {
  const { id } = useParams();
  const { data, isPending, error } = useView(id);
  console.log(data);
  return (
    <div className="view-event">
      <h1>{data && data.event.title}</h1>
      {isPending && <div>Loading</div>}
      {error && (
        <div className="error">
          <h2>{error.message}</h2>
          <Link to={"/login"}> go back to login</Link>
        </div>
      )}
    </div>
  );
}

export default ViewEvent;
