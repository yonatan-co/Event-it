interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
}: DeleteButtonProps) => {
  const DeleteHandler = async (e: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/feed/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };
  return (
    <button className="delete-btn" onClick={DeleteHandler}>
      Delete
    </button>
  );
};

export default DeleteButton;
