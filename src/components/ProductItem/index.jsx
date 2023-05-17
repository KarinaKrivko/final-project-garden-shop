import { API_URL } from "../../constants";
import styleItem from "./styles.module.css";
import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { calculateCounter } from "../../actions/cartCounterActions";
import Prices from "../Prices";

function ProductItem({ product }) {
  const [showButton, setShowButton] = useState(false);

  let url = API_URL + product.image;
  return (
    <div
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      key={product.id}
      className={styleItem.product}
    >
      <div>
        <h3>{product.title}</h3>
        <Link to={`/description/${product.id}`}>
          {" "}
          <img src={url} alt={product.image}></img>{" "}
        </Link>
        <Prices props={product}/>
        {showButton && <AddToCartButton item={product} />}
      </div>
    </div>
  );
}

export default ProductItem;

function AddToCartButton(props) {
  let { item } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateCounter());
  }, [dispatch]);

  const addToCart = () => {
    let existingValue = localStorage.getItem(`product_${item.id}`);
    if (!existingValue) {
      const resultObject = {
        count: 1,
        data: item,
      };
      localStorage.setItem(`product_${item.id}`, JSON.stringify(resultObject));
      return;
    }
    const currentData = _.attempt(() => JSON.parse(existingValue), {});
    const resultObject = {
      count: 1 + currentData.count,
      data: currentData.data,
    };
    localStorage.setItem(`product_${item.id}`, JSON.stringify(resultObject));
    dispatch(calculateCounter());
  };

  return (
    <button className={styleItem.add} onClick={addToCart}>
      Add to cart
    </button>
  );
}

AddToCartButton.propTypes = { item: PropTypes.any };
