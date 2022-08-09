import * as React from "react";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const isAuth = useSelector((state: any) => state.isAuth).isAuth;
  console.log(isAuth);

  return (
    <Box margin="auto" sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {isAuth && (
          <BottomNavigationAction
            onClick={(_: any) => navigate("/feed")}
            label="feed"
            icon={<HomeIcon />}
          />
        )}
        {isAuth && (
          <BottomNavigationAction
            onClick={(_: any) => navigate("/feed/create-event")}
            label="create event"
            icon={<AddCircleIcon />}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}

export default Navbar;
