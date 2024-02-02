import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IModal {
  children?: ReactNode;
  open?: boolean;
  className?: string;
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({
  className,
  open,
  children,
  onClose,
  ...props
}) => {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      className={`modal ${className}`}
      ref={dialogRef}
      {...props}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};
export default Modal;
