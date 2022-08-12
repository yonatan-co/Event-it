import { IPhoto } from "../../../api/src/types/types";

export interface EventState {
  event: {
    title: string;
    descraption: string;
    photos?: IPhoto[];
    creator: string;
  };
}
