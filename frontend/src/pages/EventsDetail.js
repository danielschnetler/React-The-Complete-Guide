import { useParams } from "react-router-dom";

function EventsDetailPage() {
  const parameters = useParams();

  return (
    <>
      <h1>Events Detail</h1>
      <p>{parameters.eventId}</p>
    </>
  );
}

export default EventsDetailPage;
