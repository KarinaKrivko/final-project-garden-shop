import React from "react";
import Cart from "../../components/Cart";
import ValidationForm from "../../components/ValidationForm";

function CartPage(props) {
  return (
    <div>
      <Cart />
      <ValidationForm />
    </div>
  );
}

export default CartPage;
