import { useState } from "react";

import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useCreateEvent from "../hooks/useCreateEvent";
import useUpdateEvent from "../hooks/useUpdateEvent";

import { FormProps } from "../types/types";
import { height } from "@mui/system";

function CreateEventForm({ mode }: FormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const [state, setState] = useState({
    title: "",
    descraption: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
  });
  const HandleSubmit = async (_e: any) => {
    _e.preventDefault();
    console.log("we submit");
    if (mode === "POST") {
      const { data, isPending } = await createEvent({ ...state });
    } else {
      const data = await updateEvent(id, { ...state });
    }

    navigate("/feed");
  };

  const HandleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    return state;
  };

  return (
    <>
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
        <TextField
          type="text"
          name="descraption"
          onChange={(e: any) => HandleChange(e)}
          value={state.descraption}
        />
        <label>date</label>
        <TextField
          type="date"
          name="date"
          onChange={(e: any) => HandleChange(e)}
          value={state.date}
        />
        <label>location</label>
        <TextField
          type="text"
          name="location"
          onChange={(e: any) => HandleChange(e)}
          value={state.location}
          style={{ width: 10, height: 2 }}
        />
        <button className="submit-btn" type="submit">
          shoot
        </button>
      </form>
    </>
  );
}

export default CreateEventForm;
