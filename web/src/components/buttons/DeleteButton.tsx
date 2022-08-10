import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { EventsActions } from "../../redux/events-slice";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import useDelete from "../../hooks/useDelete";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ id }: DeleteButtonProps) => {
  const deleteEvent = useDelete();
  const ClickHandler = async (e: any) => {
    await deleteEvent(id);
  };
  return (
    <Button variant="contained" onClick={ClickHandler}>
      <DeleteIcon />
    </Button>
  );
};

export default DeleteButton;
