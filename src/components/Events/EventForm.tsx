import { FormEvent, ReactNode, useState } from "react";

import ImagePicker from "../ImagePicker";
import { IEvent } from "./NewEventsSection";

interface IEventForm {
  inputData?: IEvent;
  onSubmit?: (event: {}) => void;
  children?: ReactNode;
}

export default function EventForm({
  inputData,
  onSubmit,
  children,
}: IEventForm) {
  const [selectedImage, setSelectedImage] = useState<string>(
    inputData?.image ?? ""
  );

  function handleSelectImage(image: string) {
    setSelectedImage(image);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    onSubmit && onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      <div className="control">
        <ImagePicker
          images={[]}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
