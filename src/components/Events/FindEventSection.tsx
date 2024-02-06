import { useQuery } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { IError, fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";
import { IEvent } from "./NewEventsSection";

export default function FindEventSection() {
  const searchElement = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSearchTerm(searchElement.current?.value ?? "");
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={
          (error as IError).info?.message ||
          error.message ||
          "Failed to fetch events"
        }
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
