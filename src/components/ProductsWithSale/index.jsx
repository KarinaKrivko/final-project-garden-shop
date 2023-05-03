import React, { useState } from "react";
import s from "./styles.module.css";

function ProductsWithSale(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p className={s.title}>Products with sale</p>
      <div className={s.tools_container}>
        <p className={s.price}>Price</p>
        <input className={s.from} placeholder="from"></input>
        <input className={s.to} placeholder="to"></input>
        <label className={s.sorted} htmlFor="my-select">
          Sorted
        </label>
        <select
          className={s.default}
          id="my-select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="by default">by default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}

export default ProductsWithSale;
