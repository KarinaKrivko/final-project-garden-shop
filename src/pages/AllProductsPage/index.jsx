import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import s from "./styles.module.css";
import { API_URL } from '../../constants';

function AllProductsPage() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p className={s.title}>All products</p>
        <div className={s.tools_container}>
          <p className={s.price}>Price</p>
          <input className={s.from} placeholder="from"></input>
          <input className={s.to} placeholder="to"></input>
          <p className={s.Items}>Discounted items</p>
          <input className={s.inputForDiscounted}></input>
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
      {products.map((product) => {
        let url = API_URL + product.image;
        return (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <img src={url} alt={product.image}></img>
              <p>Discount Price: {product.discont_price}</p>
              <p>Price: {product.price}</p>
            </div>
        );
      })}
    </div>
  );
}

export default AllProductsPage;
