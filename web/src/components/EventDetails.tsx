import useDetails from "../hooks/useDetails";

import { useParams } from "react-router-dom";

export const EventDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useDetails(id);
  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.event.title}</h2>
          <p>Written by {blog.event.creator}</p>
          <div>{blog.event.descraption}</div>
          {/* <button onClick={handleClick}>delete</button> */}
        </article>
      )}
    </div>
  );
};

export default EventDetails;
