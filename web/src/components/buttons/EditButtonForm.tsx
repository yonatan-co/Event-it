import { FC } from "react";

import { useNavigate } from "react-router-dom";

type ButtonProps = {
  id: string;
};

const EditButton: FC<ButtonProps> = ({ id }: ButtonProps) => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate("/feed/update-event/" + id);
  };
  return (
    <button className="delete-btn" onClick={ClickHandler}>
      Edit
    </button>
  );
};

export default EditButton;
