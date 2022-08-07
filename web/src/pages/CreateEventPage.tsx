import { useState } from "react";
import { useSelector } from "react-redux";

function CreateEventPage() {
  const [state, setState] = useState({
    title: "",
    descraption: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
  });
  const token = localStorage.getItem("token");
  const HandleSubmit = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/feed/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: state.title,
        descraption: state.descraption,
        date: state.date,
        location: state.location,
      }),
    });
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

export default CreateEventPage;
