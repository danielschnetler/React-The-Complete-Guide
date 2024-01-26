import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface IModal {
  onClose: () => void;
}

const Modal: React.FC<IValidationError> = forwardRef(
  ({ onClose, children, buttonCaption }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
      return {
        showModal() {
          dialog.current.show();
        },
        hideModal() {
          dialog.current.close();
        },
      };
    });

    return createPortal(
      <dialog ref={dialog} onClose={onClose} className="backdrop:bg-stone-900/90 p-4 shadow-md">
        {children}
        <form method="dialog" className="mt-4 text-right">
          <Button>{buttonCaption}</Button>
        </form>
      </dialog>,
      document.getElementById("modal-root")
    );
  }
);

export default Modal;
