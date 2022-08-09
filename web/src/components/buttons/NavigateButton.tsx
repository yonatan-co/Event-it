import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

type ButtonProps = {
  id: string;
  name: string;
  url: string;
};

const NavigateButton: FC<ButtonProps> = ({ id, url, name }: ButtonProps) => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate(url + id);
  };
  return (
    <Button variant="contained" onClick={ClickHandler}>
      {name}
    </Button>
  );
};

export default NavigateButton;
