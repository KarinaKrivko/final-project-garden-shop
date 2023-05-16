import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchCategory } from "../../actions/categoryActions";
import ProductItem from "../ProductItem";
import s from "./styles.module.css";
import Filters from "../Filters";

function ProductByCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productByCategory = useSelector(
    (state) => state.category.category
  );
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let values = productByCategory.data;
  if (!values) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className={s.title}>{productByCategory.category.title}</h3>
      <Filters />
      <div className={s.productContainer}>
        {values.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductByCategory;
