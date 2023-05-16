import React from "react";
import Cart from "../../components/Cart";
import Prices from "../../components/Prices";
import ValidationForm from "../../components/ValidationForm";

function CartPage(props) {
  return (
    <div>
      <Cart />
      <Prices />
      <ValidationForm />
    </div>
  );
}

export default CartPage;
