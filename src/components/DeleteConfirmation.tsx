import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

interface IDeleteConfirm {
  onConfirm: () => void;
  onCancel: () => void;
}

const TIMER = 3000;

const DeleteConfirmation: React.FC<IDeleteConfirm> = ({
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      timer ? clearTimeout(timer) : {};
    };
  }, [onConfirm, onCancel]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
};

export default DeleteConfirmation;
