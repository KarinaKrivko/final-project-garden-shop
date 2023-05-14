import {API_URL} from "../../constants";
import s from "../../pages/AllProductsPage/styles.module.css";
import React from "react";

function ProductItem({product}) {
    let url = API_URL + product.image;
    return (
        <div key={product.id} className={s.product}>
            <h3>{product.title}</h3>
            <img src={url} alt={product.image}></img>
            <p>Discount Price: {product.discont_price}</p>
            <p key={product.id} data-testid="product-price">Price: {product.price}</p>
        </div>
    );
}
export default ProductItem