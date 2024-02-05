import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IModal {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: IModal) {
  const dialog: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current as unknown as HTMLDialogElement;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
