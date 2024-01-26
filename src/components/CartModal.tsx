import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import { ICartItem } from "../App";

interface IModal {
  cartItems: ICartItem[];
  onUpdateCartItemQuantity: (id: string, quantity: number) => void;
  title: string;
  actions: ReactNode;
}

const CartModal:React.FC<IModal> = forwardRef((
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal-root")!
  );
});

export default CartModal;
