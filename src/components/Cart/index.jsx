import React, {useEffect, useState} from "react";
import s from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ValidationForm from "../ValidationForm";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";


function Cart(props) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        const storedCartItems = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)));
        setCartItems(storedCartItems);
    };

    const handleRemove = (id) => {
        const cartItems = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)))
            .filter(it=>it.id!==id)
        localStorage.removeItem(`product_${id}`);
        setCartItems(cartItems)
    }

    if (cartItems.length <= 0) {
        return (
            <div>
                {<p>No items in the cart.</p>}
            </div>
        );
    }
    return (
        <div className={s.container}>
            <h1>Shopping cart</h1>
            <Link to="/products">
                <div className={s.backContainer}>
                    <p className={s.back}>Back to the store</p>
                    <IconButton><ChevronRightIcon/></IconButton>
                </div>
            </Link>
            {cartItems.map(item =>
                <div key={item.id}>
                    <hr className={s.gorizontal_line}/>
                    <p onClick={() => handleRemove(item.id)} className={s.close}>x</p>
                    <p className={s.description}>{item.description}</p>
                    <img className={s.img} src={`${API_URL}${item.image}`} alt={item.img}/>
                    <div className={s.flex}>
                        <p className={s.price}>{item.discont_price}$</p>
                        <p data-testid={`cart-price-${item.id}`} className={s.through}>{item.price}$</p>
                    </div>
                </div>
            )}
            <ValidationForm/>
        </div>
    );
}

export default Cart;
