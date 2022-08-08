import { FC } from "react";

import { useNavigate } from "react-router-dom";

type ButtonProps = {
  id: string;
};

const EditButton: FC<ButtonProps> = ({ id }: ButtonProps) => {
  const navigate = useNavigate();
  const ClickHandler = async () => {
    try {
      const res = await fetch("http://localhost:8080/feed/update/" + id);
      if (!res.ok) {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      navigate("/feed");
      console.log(error);
    }
  };
  return <button className="delete-btn">Delete</button>;
};

export default EditButton;
