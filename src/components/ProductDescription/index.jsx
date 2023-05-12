import React, { useEffect } from "react";
import s from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../actions/productActions";

import {Link, useParams} from "react-router-dom";
import {API_URL} from "../../constants";

function ProductDescription( props ) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product[0]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  return (
      <div className={s.wrapper}>
        {product ? (
            <>
              <h1 className={s.name}>{product.title}</h1>
              <div>
                <img className={s.img} src={API_URL+product.image} alt={product.title} />
              </div>
              <div>
                <div className={s.productInformationFlex}>
                  <div className={s.priceColumn}>
                    <p className={s.price}>${product.price}</p>
                    {product.discount_price ? (
                        <>
                          <p className={s.discont_price}>
                            ${product.discount_price}{" "}
                          </p>
                          <p className={s.sale_price}>
                            -{Math.round(
                              (product.discount_price - product.price) /
                              product.discount_price *
                              100
                          )}
                            %
                          </p>
                        </>
                    ) : null}
                  </div>
                  <div>
                    <Link to="/Bucket">
                      <button className={s.cartBtn}>To cart</button>
                    </Link>
                  </div>
                  <div>
                    <h1 className={s.title}> Description</h1>
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
