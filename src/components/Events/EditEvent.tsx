import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal";
import EventForm from "./EventForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IError, fetchEvent, queryClient, updateEvent } from "../../util/http";
import { IEvent } from "./NewEventsSection";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["events", { id: params.id }],
      });
      const oldEventData = queryClient.getQueryData([
        "events",
        { id: params.id },
      ]);
      queryClient.setQueryData(["events", { id: params.id }], data.event);
      return { previousEvent: oldEventData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ["events", { id: params.id }],
        context?.previousEvent
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", { id: params.id }],
      });
    },
  });

  const event = data as IEvent;

  function handleSubmit(formData: IEvent) {
    mutate({ id: params.id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <EventForm inputData={event} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      </>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="An error has occured"
          message={
            (error as IError).info.message ||
            error.message ||
            "Please try again later"
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Ok
          </Link>
        </div>
      </>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
