export type ButtonProps = {
  id: string;
};

export type EventRequestBody = {
  title: string;
  descraption: string;
  date: string;
  location: string;
};

export type FormProps = {
  mode: string;
};

// target of delete button
export type DeleteTarget = "feed" | "user";
