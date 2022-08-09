import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

function UpdateEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(new Error(undefined));
  const [state, setState] = useState({
    title: "",
    descraption: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/feed/events/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((event) => {
        setState({
          title: event.eventId.title,
          descraption: event.eventId.descraption,
          date: event.eventId.date,
          location: event.eventId.location,
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const HandleSubmit = async (_e: any) => {
    _e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/feed/update/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        throw new Error("failed to update the event");
      }
      const data = await res.json();
      console.log(data);
      navigate("/feed");
    } catch (err: any) {
      setError(err);
    }
  };

  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    return state;
  };

  return (
    <div className="create-event">
      <form onSubmit={HandleSubmit}>
        <h2> create new event </h2>
        <label>title</label>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={(e: any) => {
            return HandleChange(e);
          }}
        />
        <label>descraption</label>
        <input
          type="text"
          name="descraption"
          onChange={(e: any) => HandleChange(e)}
          value={state.descraption}
        />
        <label>date</label>
        <input
          type="date"
          name="date"
          onChange={(e: any) => HandleChange(e)}
          value={state.date}
        />
        <label>location</label>
        <input
          type="text"
          name="location"
          onChange={(e: any) => HandleChange(e)}
          value={state.location}
        />
        <button className="submit-btn" type="submit">
          shoot
        </button>
      </form>
    </div>
  );
}
export default UpdateEventPage;
