import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useState } from "react";

const CheckoutForm = ({ setIsOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-between items-center gap-4">
        <button
          className="bg-green-400 px-3 py-1 rounded-md" 
          type="submit"
          disabled={!stripe}
          onClick={() => setIsOpen(false)}
        >
          Pay
        </button>
        <button className="bg-red-400 px-3 py-1 rounded-md"  onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </form>
  );
};
export default CheckoutForm;
