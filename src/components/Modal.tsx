import React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IModal {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({ open, children, onClose }) => {
  const dialog: React.MutableRefObject<any> = useRef<typeof dialog>();

  useEffect(() => {
    if (open && dialog.current) dialog.current.showModal();
    else if (dialog.current) dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : undefined}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
