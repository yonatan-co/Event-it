import React from "react";
import { Button } from "@mui/material";

interface UploadImageButtonProps {
  eventId: string | undefined;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  eventId,
}: UploadImageButtonProps) => {
  const upload = async (_e: any) => {
    const token = localStorage.getItem("token");
    console.warn(_e.target.files);
    const files = _e.target.files;
    const formData = new FormData();
    formData.append("image", files[0]);
    fetch("http://localhost:8080/feed/upload?event=" + eventId, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <input
        accept="image/*"
        style={{
          display: "none",
        }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(_e: any) => upload(_e)}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">Upload</Button>
      </label>
    </>
  );
};

export default UploadImageButton;
