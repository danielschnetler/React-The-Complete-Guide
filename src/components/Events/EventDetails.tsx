import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IError, deleteEvent, fetchEvent, queryClient } from "../../util/http";
import { IEvent } from "./NewEventsSection";
import ErrorBlock from "../UI/ErrorBlock";
import { useState } from "react";
import Modal from "../UI/Modal";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
  const event = data as IEvent;

  const {
    mutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", { id: params.id }],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const onDeleteClick = () => {
    mutate({ id: params.id });
  };

  let content = (
    <div id="event-details-content" className="center">
      Loading event details
    </div>
  );

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={
          (error as IError).info.message ||
          error.message ||
          "Failed to load event details, please try again later"
        }
      />
    );
  }

  if (data && !isLoading) {
    const formattedDate = new Date(event.date).toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {event.time}
              </time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event</p>
          <div className="form-actions">
            {isDeletePending && <p>Deleting, please wait</p>}
            {!isDeletePending && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={onDeleteClick} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isDeleteError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                (deleteError as IError).info.message ||
                deleteError.message ||
                "Failed to delete event, please try again later"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
