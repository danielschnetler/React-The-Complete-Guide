import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal";
import EventForm from "./EventForm";
import { useMutation } from "@tanstack/react-query";
import { IError, createNewEvent, queryClient } from "../../util/http";
import { IEvent } from "./NewEventsSection";
import ErrorBlock from "../UI/ErrorBlock";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  function handleSubmit(formData: IEvent) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting"}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            (error as IError).info.message ||
            error.message ||
            "Failed to create event. Please check your inputs and try again later"
          }
        />
      )}
    </Modal>
  );
}
