import { Action } from "@reduxjs/toolkit";

export interface ILoginAction extends Action {
  payload: string;
}
