import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated");
  return <div>HomePage</div>;
}

export default HomePage;
