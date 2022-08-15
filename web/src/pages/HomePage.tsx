import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated");
  useEffect(() => {
    if (isAuth) {
      navigate("/feed");
    } else {
      navigate("/login");
    }
  }, []);
  return <div>HomePage</div>;
}

export default HomePage;
