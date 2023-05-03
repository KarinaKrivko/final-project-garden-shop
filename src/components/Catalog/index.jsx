import React from "react";
import s from "./styles.module.css";
import fertilizer from "./media/fertilizer.png";
import material from "./media/planting_material.png";
import products from "./media/protective_products.png";
import tools from "./media/tools.png";
import { Link } from 'react-router-dom';


function Catalog() {

  const handleClick = () => {

  };
  return (
    <div className={s.catalog_container}>
      <h2 className={s.catalog}>Catalog</h2>

      <div>
        <Link to="/categories">
        <button onClick={handleClick} className={s.btn_categories}>All Categories</button>
      </Link>
      </div>

      <div className={s.image_cont}>
        <img src={fertilizer} alt="fertilizer"></img>
        <img src={material} alt="planting_material"></img>
        <img src={products} alt="protective_products"></img>
        <img src={tools} alt="tools"></img>
      </div>

      <div className={s.grid_cont}>
        <div className={s.content_1}>Fertilizer</div>
        <div className={s.content_2}>Protective products and septic tanks </div>
        <div className={s.content_3}>Planting material </div>
        <div className={s.content_4}>Tools and Inventory</div>
      </div>
    </div>
  );
}

export default Catalog;
