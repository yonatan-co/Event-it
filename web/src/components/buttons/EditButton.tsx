import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import { ButtonProps } from "../../types/types";

const EditButton: FC<ButtonProps> = ({ id }: ButtonProps) => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate("/feed/update-event/" + id);
  };
  return (
    <Button variant="contained" onClick={ClickHandler}>
      <EditIcon />
    </Button>
  );
};

export default EditButton;
