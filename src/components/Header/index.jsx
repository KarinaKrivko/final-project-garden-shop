import React, {useEffect} from "react";
import s from "./styles.module.css";
import logo from "./media/logo.png";
import {Link, NavLink} from "react-router-dom";
import {BsHandbag} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {calculateCounter} from "../../actions/cartCounterActions";
import * as PropTypes from "prop-types";
import {useMediaQuery} from "@mui/material";
import HeaderMenuSmall from "../HeaderMenuSmall";


function Header(props) {

    const dispatch = useDispatch()
    const cartCounter = useSelector(state => state.counter.counter);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        dispatch(calculateCounter());
    }, [dispatch]);

    return (
        <header>
            {isSmallScreen ?
                <div className={s.smallContainer}>
                    <HeaderMenuSmall cartCounter={cartCounter}/>
                </div> :
                <HeaderMenuLarge cartCounter={cartCounter}/>}
        </header>
    );
}

export default Header;

function HeaderMenuLarge(props) {
    if (!props.cartCounter) return null
    return <>
        <div className={s.header_container}>
            <Link to="/">
                <img className={s.logo} src={logo} alt="logo"/>
            </Link>
            <div>
                <Link to="/categories">
                    <button className={s.catalogBtn}>Catalog</button>
                </Link>
            </div>
        </div>

        <NavLink className={s.mainPage}>
            <NavLink to="/">Main Page</NavLink>
            <NavLink to="/products">All Products</NavLink>
            <NavLink to="/sales/all">All Sales</NavLink>
        </NavLink>
        <NavLink className={s.basket} to="/bucket">
                <span className={s.counter}>
                    {props.cartCounter}
                </span>
            <BsHandbag/>
        </NavLink>
    </>;
}


HeaderMenuLarge.propTypes = {cartCounter: PropTypes.any};

