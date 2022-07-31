import { Action } from "@reduxjs/toolkit";

export interface ILoginAction extends Action {
  payload: {
    userId: string;
  };
}
