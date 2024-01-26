import { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";

interface INewProject {
  handleSave: (project: {}) => void;
  handleCancel: () => void;
}

const NewProject: React.FC<INewProject> = ({ handleSave, handleCancel }) => {
  const [titleError, setTitleError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [dueDateError, setDueDateError] = useState(true);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const errorModal = useRef();

  function handleSaveClick() {
    const enteredTitle = titleRef.current ? titleRef.current.value() : "";
    const enteredDescription = descriptionRef.current
      ? descriptionRef.current.value()
      : "";
    const enteredDueDate = dueDateRef.current ? dueDateRef.current.value() : "";
    setTitleError(enteredTitle.trim() === "");
    setDescriptionError(enteredDescription.trim() === "");
    setDueDateError(enteredDueDate.trim() === "");

    if (titleError || descriptionError || dueDateError) {
      errorModal.current.showModal();
    } else {
      handleSave({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDueDate,
      });
    }
  }

  function handleOnModalClose() {
    errorModal.current.hideModal();
  }

  return (
    <>
      <Modal ref={errorModal} onClose={handleOnModalClose} buttonCaption="OK">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        {titleError && <p className="text-stone-600 mb-4">Title is invalid</p>}
        {descriptionError && (
          <p className="text-stone-600 mb-4">Description is invalid</p>
        )}
        {dueDateError && (
          <p className="text-stone-600 mb-4">Due date is invalid</p>
        )}
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={handleCancel}
              className="text-stone-500 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSaveClick}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <Input type="text" label="Title" ref={titleRef} />
        <Input label="Description" textarea ref={descriptionRef} />
        <Input type="date" label="Due Date" ref={dueDateRef} />
      </div>
    </>
  );
};
export default NewProject;
