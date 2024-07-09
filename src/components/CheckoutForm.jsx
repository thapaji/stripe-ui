import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = e.target;
    const payLoad = { amount: 25, currency: "aud", paymentMethod: "card" };
    console.log(`Form submitted: Name: ${name.value}, Email: ${email.value}`);

    const apiEP = "http://localhost:3000/create-stripe-payment";
    const { data } = await axios.post(apiEP, payLoad);

    const { paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name.value,
          email: email.value,
        },
      },
    });

    console.log(paymentIntent);

    const confirmEP = "http://localhost:3000/confirm-order";
    const response = await axios.post(confirmEP, { paymentIntent: paymentIntent.id });
    console.log(response);
    alert(response.data.message)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input type="text" name="name" placeholder="Name" />
      </div>
      <div>
        Email: <input type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <CardElement />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
