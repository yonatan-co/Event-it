import { FC } from "react";

import { useNavigate } from "react-router-dom";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ id }: DeleteButtonProps) => {
  const navigate = useNavigate();
  const DeleteHandler = async (e: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/feed/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (!res.ok) {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      navigate("/feed");
      console.log(error);
    }
  };
  return (
    <button className="delete-btn" onClick={DeleteHandler}>
      Delete
    </button>
  );
};

export default DeleteButton;
