import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";
import { useQuery } from "@tanstack/react-query";
import { IError, fetchEvents } from "../../util/http";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: HTMLImageElement;
}

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5000,
    //gcTime:
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={(error as IError).info?.message}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {(data as IEvent[]).map((event) => (
          <li key={event.id}>
            <EventItem {...event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
