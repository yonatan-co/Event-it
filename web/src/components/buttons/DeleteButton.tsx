import { FC } from "react";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import useDelete from "../../hooks/useDelete";
import { DeleteTarget } from "../../types/types";

interface DeleteButtonProps {
  id: string;
  target: DeleteTarget;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  id,
  target,
}: DeleteButtonProps) => {
  const deleteEvent = useDelete();
  const ClickHandler = async (e: any) => {
    await deleteEvent(id, "feed");
  };
  return (
    <Button variant="contained" color="error" onClick={ClickHandler}>
      <DeleteIcon />
    </Button>
  );
};

export default DeleteButton;
