import { Action } from "@reduxjs/toolkit";
import { IEvent } from "../../../api/src/models/event.model";

export interface ILoginAction extends Action {
  payload: string;
}
