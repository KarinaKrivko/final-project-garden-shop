import React, {useEffect, useState} from "react";
import s from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ValidationForm from "../ValidationForm";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import _ from "lodash";
import {useDispatch} from "react-redux";
import {calculateCounter} from "../../actions/cartCounterActions";


function Cart(props) {
    const [cartItems, setCartItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateCounter());
    }, [dispatch]);


    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        const storedCartItems = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)));
        setCartItems(storedCartItems);
        const everyProductTotal = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)))
            .map(item => {
                let everyTotal = 0
                if (item.data.discont_price) {
                    return everyTotal + item.count * item.data.discont_price
                }
                return everyTotal + item.count * item.data.price
            })
        let total = _.sum(everyProductTotal);
        localStorage.setItem("total", `${total}`)
    };

    const handleRemove = (id) => {
        const cartItems = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)))
            .filter(it => it.data.id !== id)
        localStorage.removeItem(`product_${id}`);
        setCartItems(cartItems)
        dispatch(calculateCounter());
    }

    const handleMinus = (id) => {
        let parsed = JSON.parse(localStorage.getItem(`product_${id}`));
        if (parsed.count === 0) return
        const count = parsed.count - 1
        const resultObject = {
            count: count,
            data: parsed.data
        }
        localStorage.setItem(`product_${id}`, JSON.stringify(resultObject))
        loadCartItems()
        dispatch(calculateCounter());
    }

    const handlePlus = (id) => {
        let parsed = JSON.parse(localStorage.getItem(`product_${id}`));
        const count = parsed.count + 1
        const resultObject = {
            count: count,
            data: parsed.data
        }
        localStorage.setItem(`product_${id}`, JSON.stringify(resultObject))
        loadCartItems()
        dispatch(calculateCounter())
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

            {

                cartItems.map(item =>
                    <div key={item.data.id}>
                        <hr className={s.gorizontal_line}/>
                        <p onClick={() => handleRemove(item.data.id)} className={s.close}>x</p>
                        <p className={s.description}>{item.data.description}</p>
                        <img className={s.img} src={`${API_URL}${item.data.image}`} alt={item.data.img}/>
                        <div className={s.flex}>
                            {item.data.discont_price && (
                                <>
                                    <p className={s.price}>{item.data.discont_price}$</p>
                                    <p data-testid={`cart-price-${item.data.id}`}
                                       className={s.through}>{item.data.price}$</p>
                                </>
                            )
                            }
                            {!item.data.discont_price && (
                                <p className={s.price}>{item.data.price}$</p>
                            )
                            }

                        </div>
                        <h3>Count: {item.count}</h3>
                        <ToggleButtonGroup
                            exclusive
                            aria-label="text alignment"
                        >
                            <ToggleButton value="left" aria-label="left aligned"
                                          onClick={(id) => handleMinus(item.data.id)}>
                                -
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered" disabled={true}>
                                {item.count}
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned"
                                          onClick={() => handlePlus(item.data.id)}>
                                +
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )}
            <h4>Total:{localStorage.getItem("total")}</h4>
            <ValidationForm total={localStorage.getItem("total")}/>
        </div>
    );
}

export default Cart;
