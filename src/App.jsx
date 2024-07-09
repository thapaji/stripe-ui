import React from "react";
import { Checkout } from "./components/Checkout";

const App = () => {
  return (
    <div className="main">
      <h1>Stripe Payment</h1>
      <hr />
      <Checkout />
      <hr />
    </div>
  );
};

export default App;
