import { Link } from "react-router-dom";

import styled from "styled-components";

import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";

import useFeed from "../hooks/useFeed";
import ViewButton from "./buttons/ViewButton";

import Title from "./styledComponents/Title";

const CustomizedTableRow = styled(TableRow)`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease 0s 1 normal forwards;
`;

function FeedPage() {
  const { events, error, isPending } = useFeed();
  console.log(events);
  return (
    <div className="homepage">
      <Title>events</Title>
      {events.length < 1 && !error && (
        <div>
          <h3>no events (yet)</h3>
          <Link to="/feed/create-event">create one!</Link>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {events.map((event: any) => (
              <CustomizedTableRow
                key={event.eventId._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {event.eventId.title}
                </TableCell>
                <TableCell align="right">{event.eventId.descraption}</TableCell>
                <TableCell align="right">{event.eventId.location}</TableCell>
                <TableCell align="right">
                  <Stack spacing={2} direction="row">
                    <EditButton id={event.eventId._id} />
                    <ViewButton id={event.eventId._id} />
                    <DeleteButton id={event.eventId._id} target={"feed"} />
                  </Stack>
                </TableCell>
              </CustomizedTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <div className="error">
          <h2>{error}</h2>
          <Link to={"/login"}> go back to login</Link>
        </div>
      )}
      {isPending && <div>Loading</div>}
    </div>
  );
}

export default FeedPage;
