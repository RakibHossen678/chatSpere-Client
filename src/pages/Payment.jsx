import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/Checkout/CheckoutForm";
import { Helmet } from "react-helmet-async";
const Payment = () => {
  let [isOpen, setIsOpen] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  return (
    <div className="mb-16 pt-20">
      <Helmet>
        <title>ChatSphere || Payment </title>
      </Helmet>
      <section className="py-6 ">
        <div className="container mx-auto flex flex-col items-center justify-center max-w-3xl p-4   ">
          <div className="flex flex-col items-center justify-center flex-1 p-4 pb-8 w-full text-center rounded-md sm:p-8 lg:p-16 bg-green-200 text-gray-900">
            <span className="text-sm font-semibold py-1">Advanced</span>
            <p className="text-5xl font-bold">$20</p>
            <p className="font-semibold py-3">Subscribe for unlimited posts</p>

            <button
              className="px-8 py-1 text-lg font-semibold rounded text-white mt-4  bg-green-400"
              onClick={() => setIsOpen(true)}
            >
              Subscribe
            </button>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className=" z-50"
            >
              <div className="fixed inset-0 flex  items-center justify-center w-full p-4">
                <DialogPanel className="max-w-2xl space-y-4 border bg-gray-100 rounded-lg  p-12">
                  <div className=" w-full">
                    <p className="w-72"></p>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm setIsOpen={setIsOpen}></CheckoutForm>
                    </Elements>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
