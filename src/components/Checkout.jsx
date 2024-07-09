import React from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export const Checkout = () => {
  const stripeKey = import.meta.env.VITE_APP_STRIPE_KEY;
  console.log(stripeKey);
  const stripePublicKey = loadStripe(stripeKey);
  return (
    <div>
      <div>Cart Total: $50</div>
      <hr />
      <Elements stripe={stripePublicKey}>
        {" "}
        <CheckoutForm />
      </Elements>
    </div>
  );
};
