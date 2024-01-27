import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
}

const Modal:React.FC<IModal> = forwardRef(({ children }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')!
  );
});

export default Modal;
