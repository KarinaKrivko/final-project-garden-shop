import React from "react";
import s from "./styles.module.css";
import fertilizer from "./media/fertilizer.png";
import material from "./media/planting_material.png";
import products from "./media/protective_products.png";

function Sale(props) {
  return (
    <div className={s.sale_container}>
      <h2 className={s.sale}>Sale</h2>

      <div className={s.image_container}>
        <img src={fertilizer} alt="fertilizer"></img>
        <img src={material} alt="planting_material"></img>
        <img src={products} alt="protective_products"></img>
      </div>

      <div className={s.grid_container}>
        <div className={s.content_1}>Fertilizer</div>
        <div className={s.content_2}>Protective products and septic tanks </div>
        <div className={s.content_3}>Planting material </div>
      </div>
    </div>
  );
}

export default Sale;
