import React, { useEffect } from "react";
import s from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import _ from "lodash";
import { calculateCounter } from "../../actions/cartCounterActions";

function ProductDescription(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product[0]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(calculateCounter());
  }, [dispatch]);

  const handleToCart = (item) => {
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
    <div className={s.wrapper}>
      {product ? (
        <>
          <div>
            <h1 className={s.name}>{product.title}</h1>
            <img
              className={s.img}
              src={API_URL + product.image}
              alt={product.title}
            />
          </div>
          <div>
            <div className={s.productInformationFlex}>
              <div className={s.priceColumn}>
                <span className={s.price}>${product.price}</span>
                {product.discont_price ? (
                  <>
                    <span className={s.discont_price}>
                      ${product.discont_price}{" "}
                    </span>
                    <span className={s.sale_price}>
                      {Math.round(
                        ((product.discont_price - product.price) /
                          product.discont_price) *
                          100
                      )}
                      %
                    </span>
                  </>
                ) : null}
              </div>
              <div>
                <button
                  onClick={() => handleToCart(product)}
                  className={s.cartBtn}
                >
                  To cart
                </button>
              </div>
              <div className={s.dottedLine}></div>
              <div>
                <h2 className={s.descriptionName}> Description</h2>
                <p className={s.description}>{product.description}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDescription;
