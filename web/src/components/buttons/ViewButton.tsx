import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CelebrationIcon from "@mui/icons-material/Celebration";

import { ButtonProps } from "../../types/types";

const ViewButton: FC<ButtonProps> = ({ id }: ButtonProps) => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate("/feed/view/" + id);
  };
  return (
    <Button variant="contained" onClick={ClickHandler}>
      <CelebrationIcon />
    </Button>
  );
};

export default ViewButton;
