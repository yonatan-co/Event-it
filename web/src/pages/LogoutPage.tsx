import { useEffect } from "react";

import useLogout from "../hooks/useLogout";

function LogoutPage() {
  const logout = useLogout();
  useEffect(() => {
    logout();
  });
  return <div>Loading</div>;
}

export default LogoutPage;
