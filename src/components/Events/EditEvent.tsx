import {
  Link,
  redirect,
  redirectDocument,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal";
import EventForm from "./EventForm";
import { useQuery } from "@tanstack/react-query";
import { IError, fetchEvent, queryClient, updateEvent } from "../../util/http";
import { IEvent } from "./NewEventsSection";
import ErrorBlock from "../UI/ErrorBlock";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const params = useParams();
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ["events", { id: params.id }],
  //     });
  //     const oldEventData = queryClient.getQueryData([
  //       "events",
  //       { id: params.id },
  //     ]);
  //     queryClient.setQueryData(["events", { id: params.id }], data.event);
  //     return { previousEvent: oldEventData };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(
  //       ["events", { id: params.id }],
  //       context?.previousEvent
  //     );
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["events", { id: params.id }],
  //     });
  //   },
  // });

  const event = data as IEvent;

  function handleSubmit(formData: IEvent) {
    //mutate({ id: params.id, event: formData });
    //navigate("../");
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (data) {
    content = (
      <>
        <EventForm inputData={event} onSubmit={handleSubmit}>
          {state === "submitting" ? (
            <p>Sending data...</p>
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
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

export const loader = ({ params }: any) => {
  return queryClient.fetchQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
};

export const action = async ({ request, params }: any) => {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData as IEvent });
  await queryClient.invalidateQueries({
    queryKey: ["events", { id: params.id }],
  });
  return redirect("../");
};
