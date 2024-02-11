import { QueryClient } from "@tanstack/react-query";
import { IEvent } from "../components/Events/NewEventsSection";

export const queryClient = new QueryClient();

export class IError extends Error {
  code!: number;
  info!: {
    message: string;
  };
}

interface IABortSignal {
  signal: AbortSignal;
}

interface IFetchEvents extends IABortSignal {
  searchTerm?: string;
  max?: number;
}

export async function fetchEvents({ signal, searchTerm, max }: IFetchEvents) {
  //console.log(searchTerm);
  let url = "http://localhost:3000/events";
  if (searchTerm && max) url += `?search=${searchTerm}&max=${max}`;
  else if (searchTerm) url += `?search=${searchTerm}`;
  else if (max) url += `?max=${max}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new IError("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

interface ICreateNewEvent {
  event: IEvent;
}
export async function createNewEvent(eventData: ICreateNewEvent) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new IError("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }: IABortSignal) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new IError("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

interface IFetchEvent extends IABortSignal {
  id: string | undefined;
}

export async function fetchEvent({ id, signal }: IFetchEvent) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new IError("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id }: { id: string | undefined }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new IError("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

interface IUpdateEvent {
  id: string | undefined;
  event: IEvent;
}

export async function updateEvent({ id, event }: IUpdateEvent) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new IError("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
