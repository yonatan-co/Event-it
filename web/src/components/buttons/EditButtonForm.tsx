import { useNavigate } from "react-router-dom";

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};


const EditButton = () => {
  const navigate = useNavigate();
  return <button className="delete-btn">Delete</button>;
};

export default EditButton;
