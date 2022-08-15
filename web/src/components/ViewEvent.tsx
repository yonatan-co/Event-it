import { useParams, Link } from "react-router-dom";

import useUpload from "../hooks/useUpload";
import useView from "../hooks/useView";

import UploadImageButton from "./buttons/UploadImageButton";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import styled from "styled-components";

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomizedImage = styled(ImageListItem)`
  text-decoration: none;
  color: inherit;

  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

function ViewEvent() {
  const { id } = useParams();
  const { data, isPending, error } = useView(id);
  const photos = data?.event.photos;

  return (
    <div className="view-event">
      <Title>
        {data && data.event.title}
        {id && <UploadImageButton onChange={useUpload} id={id} />}
      </Title>
      {photos && (
        <ImageList
          sx={{ width: 1500, height: 977 }}
          style={{ overflow: "hidden", margin: "auto" }}
          cols={3}
          rowHeight={164}
        >
          {photos.map((photo: string) => (
            <CustomizedImage key={photo[0]}>
              <img
                src={`http://localhost:8080/${photo[0]}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`http://localhost:8080/${photo[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={photo[0]}
                loading="lazy"
              />
            </CustomizedImage>
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
