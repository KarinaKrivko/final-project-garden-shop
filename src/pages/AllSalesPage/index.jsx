import React from "react";

import s from "./styles.module.css";
import ProductItem from "../../components/ProductItem";
import { useSelector } from "react-redux";
import Filters from "../../components/Filters";

function AllSalesPage(props) {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <h1 className={s.pageName}>Products with sale</h1>
      <Filters showDiscountCmp={false} />
      <div className={s.productContainer}>
        {products
          .filter((it) => it.discont_price != null)
          .map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default AllSalesPage;
