import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IBody {
  title: string;
  descraption: string;
  date: string;
  location: string;
}

const useCreateEvent = () => {
  const token = localStorage.getItem("token");
  const [success, setSuccess] = useState(false);

  const createEvent = async (body: IBody) => {
    console.log(token);
    try {
      const res = await fetch("http://localhost:8080/feed/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setSuccess(true);
      return success;
    } catch (error) {
      setSuccess(false);
      console.log(error);
      return success;
    }
  };
  return createEvent;
};

export default useCreateEvent;
