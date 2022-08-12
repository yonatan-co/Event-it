import { useParams, Link } from "react-router-dom";
import useView from "../hooks/useView";

import { Photo } from "../types/types";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function ViewEvent() {
  const { id } = useParams();
  const { data, isPending, error } = useView(id);
  const photos = data?.event.photos[0];
  return (
    <div className="view-event">
      <h1>{data && data.event.title}</h1>
      {photos && (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {photos.map((photo: Photo) => (
            <ImageListItem key={photo.img}>
              <img
                src={`http://localhost:8080/${photo.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`http://localhost:8080/${photo.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.id}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
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
