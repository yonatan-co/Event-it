import CreateEventForm from "../components/CreateEventForm";
import Navbar from "../components/Navbars/FeedNavbar";

function CreateEventPage() {
  return (
    <div className="create-event">
      <Navbar />
      <CreateEventForm />;
    </div>
  );
}

export default CreateEventPage;
