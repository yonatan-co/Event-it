import { useParams } from "react-router-dom";
import useFetch from "../hooks/useDetails";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch();

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

export default BlogDetails;
