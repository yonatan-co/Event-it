import { useState } from "react";

import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import useCreateEvent from "../hooks/useCreateEvent";
import useUpdateEvent from "../hooks/useUpdateEvent";

import { FormProps } from "../types/types";
import { height } from "@mui/system";

const CustomForm = styled.form`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
`;

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
      await createEvent({ ...state });
    } else {
      await updateEvent(id, { ...state });
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
      <CustomForm onSubmit={HandleSubmit}>
        <Stack spacing={3}>
          <h2> create new event </h2>
          <label>title</label>
          <TextField
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
          />
          <button className="submit-btn" type="submit">
            shoot
          </button>
        </Stack>
      </CustomForm>
    </>
  );
}

export default CreateEventForm;
