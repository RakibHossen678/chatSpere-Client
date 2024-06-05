import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CheckoutForm = ({ setIsOpen }) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState();
  const [processing, setProcessing] = useState(false);
  console.log(clientSecret);
  useEffect(() => {
    getClientSecret();
  }, []);
  const getClientSecret = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: 20,
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (paymentInfo) => {
      const { data } = await axiosSecure.post("/payment", paymentInfo);
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Payment is successful");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError();
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError.message);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      const paymentInfo = {
        email: user?.email,
        transactionId: paymentIntent.id,
      };
      console.log(paymentInfo);
      try {
        await mutateAsync(paymentInfo);
        setIsOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
    setProcessing(false);
    
  };

  return (
    <>
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
            // onClick={() => setIsOpen(false)}
            className="bg-green-400 px-3 py-1 rounded-md"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
          <button
            type="button"
            className="bg-red-400 px-3 py-1 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-500 ">{cardError}</p>}
    </>
  );
};
export default CheckoutForm;
