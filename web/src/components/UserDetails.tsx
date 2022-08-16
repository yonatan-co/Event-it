import { useParams } from "react-router-dom";

import useUser from "../hooks/useUser";
import Title from "./styledComponents/Title";
import DeleteButton from "./buttons/DeleteButton";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function UserDetails() {
  const { id } = useParams();
  const { data, isPending, error } = useUser(id);
  const loggedUser = localStorage.getItem("userId");
  console.log(data);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1000,
            height: 450,
          },
        }}
      >
        <Paper elevation={1} sx={{ bgcolor: "#FEE3EC" }}>
          {!data && <Title>no user found!</Title>}
          {data && (
            <div className="user-details">
              <Title>username: {data.user.username}</Title>
              <Title>email: {data.user.email}</Title>
            </div>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default UserDetails;
