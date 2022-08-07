import { useState } from "react";

function CreateEventPage() {
  const [state, setState] = useState({
    title: "",
    descraption: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
  });

  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    return state;
  };

  return (
    <div className="create-event">
      <form>
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
        <input type="text" value={state.descraption} />
        <label>date</label>
        <input type="date" value={state.date} />
        <label>location</label>
        <input type="text" value={state.location} />
        <button className="submit-btn" type="submit">
          shoot
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
