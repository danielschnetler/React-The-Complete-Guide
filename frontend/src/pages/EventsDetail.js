import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../util/auth";

function EventsDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense>
        <Await resolve={event}>
          {(awaitedEvent) => <EventItem event={awaitedEvent} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={events}>
          {(awaitedEvents) => <EventsList events={awaitedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return json(
      { message: "Could not fetch details for selected event" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id), //wait the data before loading the page
    events: loadEvents(), //defered loading after loading the page
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }
  return redirect("/events");
}
