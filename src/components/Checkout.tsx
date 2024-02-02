import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../store/shopping-cart-context";
import { UserProgressContext } from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import { Button } from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout: React.FC = () => {
  const { cartItems, clearCartItems } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { sendRequest, isLoading, error, data, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const totalAmount = cartItems.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const postData = async (customerData: {}) => {
    const bodyData = {
      order: {
        items: cartItems,
        customer: customerData,
      },
    };
    const response = sendRequest("http://localhost:3000/orders", {
      ...requestConfig,
      body: JSON.stringify(bodyData),
    });
    return response;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    const response = postData(customerData);
  };

  const handeFinish = () => {
    clearCartItems();
    clearData();
    hideCheckout();
  };

  if (data && !error) {
    return (
      <Modal
        open={progress === "checkout"}
        onClose={hideCheckout}
        className={""}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p className="modal-actions">
          <Button onClick={handeFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal className={""} open={progress === "checkout"} onClose={hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amout: {currencyFormatter.format(totalAmount)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
          {isLoading ? (
            <span>Sending order data</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={hideCheckout}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
