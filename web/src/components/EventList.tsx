import { FunctionComponent } from "react";

interface EventsListProps {
  userId: string;
  isAuth: boolean;
}

const EventsList: FunctionComponent<EventsListProps> = () => {
  return <div>events</div>;
};

export default EventsList;
