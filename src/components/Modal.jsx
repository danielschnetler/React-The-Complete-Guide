import classes from "./Modal.module.css";

function Modal({ children, onModalChange }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onModalChange} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
