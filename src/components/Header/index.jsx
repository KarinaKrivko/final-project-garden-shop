import React from "react";
import s from "./styles.module.css";
import logo from "./media/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";

function Header(props) {
  return (
    <header>
      <div className={s.header_container}>
        <img className={s.logo} src={logo} alt="logo" />
        <div>
          <Link to="/categories">
            <button className={s.catalogBtn}>Catalog</button>
          </Link>
        </div>
      </div>

      <NavLink className={s.mainPage}>
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/products/all">All Products</NavLink>
        <NavLink to="/sales/all">All Sales</NavLink>
      </NavLink>
      <BsHandbag className={s.basket} />
    </header>
  );
}

export default Header;
