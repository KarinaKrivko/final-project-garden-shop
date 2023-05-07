import React, {useEffect, useState} from "react";
import s from "./styles.module.css";
import ToolsItem from "../ToolsItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../actions/productActions";

function Tools(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div>
      <p className={s.title}>Tools and equipment</p>
      <div className={s.tools_container}>
        <p className={s.price}>Price</p>
        <input className={s.from} placeholder="from"></input>
        <input className={s.to} placeholder="to"></input>
        <p className={s.Items}>Discounted items</p>
        <input className={s.inputForDiscounted}></input>
        <label className={s.sorted} htmlFor="my-select">Sorted</label>
        <select  className={s.default}  id="my-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="by default">by default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
        </select>
      </div>
      <div></div>
      <div className="tools">
        {products.map(product => (
            <ToolsItem key={product.id} item={product} />
        ))}
      </div>

    </div>
  );
}

export default Tools;

