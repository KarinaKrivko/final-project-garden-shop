import {API_URL} from "../../constants";
import s from "../../pages/AllProductsPage/styles.module.css";
import React, {useState} from "react";
import Button from '@mui/material/Button';
import * as PropTypes from "prop-types";
import {array} from "yup";
import _ from "lodash";


function ProductItem({product}) {

    const [showButton, setShowButton] = useState(false);

    let url = API_URL + product.image;
    return (
        <div onMouseEnter={() => setShowButton(true)}
             onMouseLeave={() => setShowButton(false)}
             key={product.id} className={s.product}>
            <h3>{product.title}</h3>
            <img src={url} alt={product.image}></img>
            <p>Discount Price: {product.discont_price}</p>
            <p key={product.id} data-testid="product-price">Price: {product.price}</p>
            {showButton && <AddToCartButton item={product}/>}
        </div>

    );
}

export default ProductItem

function AddToCartButton(props) {
    let {item} = props;

    const addToCart = () => {
        let existingValue = localStorage.getItem(`product_${item.id}`);
        if (!existingValue) {
            const resultObject = {
                count: 1,
                data: item
            }
            localStorage.setItem(`product_${item.id}`, JSON.stringify(resultObject));
            return
        }
        const currentData = _.attempt(() => JSON.parse(existingValue), {});
        const resultObject = {
            count: 1 + currentData.count,
            data: currentData.data
        }
        localStorage.setItem(`product_${item.id}`, JSON.stringify(resultObject))
    };

    return <Button onClick={addToCart}>Add To Cart</Button>;
}

AddToCartButton.propTypes = {item: PropTypes.any}
