import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteButton from "./buttons/DeleteButton";
import NavigateButton from "./buttons/NavigateButton";

import useFeed from "../hooks/useFeed";

function FeedPage() {
  const { events, error, isPending } = useFeed();

  return (
    <div className="homepage">
      {isPending && <div>Loading</div>}
      {<h1>events</h1>}
      {events.length < 1 && !error.message && (
        <div>
          <h3>no events (yet)</h3>
          <Link to="/feed/create-event">create one!</Link>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {events.map((event: any) => (
              <TableRow
                key={event.eventId._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {event.eventId.title}
                </TableCell>
                <TableCell align="right">{event.eventId.descraption}</TableCell>
                <TableCell align="right">{event.eventId.location}</TableCell>
                <TableCell align="right">by: {event.creator}</TableCell>
                <TableCell align="right">
                  <Stack spacing={2} direction="row">
                    <NavigateButton
                      id={event.eventId._id}
                      name="Edit"
                      url="/feed/update-event/"
                    />
                    <NavigateButton
                      id={event.eventId._id}
                      name="View"
                      url="/feed/event/"
                    />
                    <DeleteButton id={event.eventId._id} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error.message && (
        <div className="error">
          <h2>{error.message}</h2>
          <Link to={"/login"}> go back to login</Link>
        </div>
      )}
    </div>
  );
}

export default FeedPage;
