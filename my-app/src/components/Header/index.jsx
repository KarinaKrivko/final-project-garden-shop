import React from "react";
import s from "./styles.module.css";
import logo from "./media/logo.png";
import basket from "./media/basket.png";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
        <img className={s.logo} src={logo} alt="logo" />
        <div className={s.contStyle}>
          <button className={s.catalogBtn}>Catalog</button>
        </div>
        <NavLink className={s.mainPage}>
          <NavLink to="/">
            Main Page
          </NavLink>
          <NavLink to="/products/all">
            All Products
          </NavLink>
          <NavLink to="/sales/all">
            All Sales
          </NavLink>
        </NavLink>
        <img className={s.basket} src={basket} alt="basket" />
      </header>
   
  );
}

export default Header;
