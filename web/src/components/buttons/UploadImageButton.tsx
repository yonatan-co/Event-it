import React from "react";
import { Button } from "@mui/material";

interface UploadButtonProps {
  onChange: (_e: any, id: string) => Promise<void>;
  id: string;
}

const UploadImageButton: React.FC<UploadButtonProps> = ({
  onChange,
  id,
}: UploadButtonProps) => {
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
        onChange={(_e: any) => onChange(_e, id)}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">Upload</Button>
      </label>
    </>
  );
};

export default UploadImageButton;
