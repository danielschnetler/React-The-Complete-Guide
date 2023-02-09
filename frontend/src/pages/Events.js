import { Link } from "react-router-dom";

const EVENTS = [
  { id: "e1", description: "Event 1" },
  { id: "e2", description: "Event 2" },
  { id: "e3", description: "Event 3" },
  { id: "e4", description: "Event 4" },
];

function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <ul>
        {EVENTS.map((ev) => (
          <li key={ev.id}>
            <Link to={`/events/${ev.id}`}>{ev.description}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
