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
            .filter(it=>it.data.id!==id)
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
                <div key={item.data.id}>
                    <hr className={s.gorizontal_line}/>
                    <p onClick={() => handleRemove(item.data.id)} className={s.close}>x</p>
                    <p className={s.description}>{item.data.description}</p>
                    <img className={s.img} src={`${API_URL}${item.data.image}`} alt={item.data.img}/>
                    <div className={s.flex}>
                        <p className={s.price}>{item.data.discont_price}$</p>
                        <p data-testid={`cart-price-${item.data.id}`} className={s.through}>{item.data.price}$</p>
                    </div>
                    <h3>Count: {item.count}</h3>
                </div>
            )}
            <ValidationForm/>
        </div>
    );
}

export default Cart;
