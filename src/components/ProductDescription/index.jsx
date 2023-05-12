import React from "react";
import s from "./styles.module.css";
import spade from "./media/spade.png";
import { Link } from "react-router-dom";

function ProductDescription(props) {
  return (
    <div className={s.wrapper}>
      <h1 className={s.name}>Spade</h1>
      <div>
        <img className={s.img} src={spade} alt="spade"></img>
      </div>
      <div >
        <div className={s.productInformationFlex}>
          <div className={s.priceColumn}>
            <p className={s.price}>199$</p>
            <p className={s.price_linethrough}>250$ </p>
            <p className={s.sale_price}>-7%</p>
          </div>
          <div>
            <Link to="/Bucket">
              <button className={s.cartBtn}>To cart</button>
            </Link>
          </div>
          <div>
          <h1 className={s.title}> Description</h1>
          <p className={s.description}>
            Size, cm - 45x33 Material: frost-resistant polymer, reinforced by a
            steel galvanized bar, riveted to the blade, aluminum handle with a
            V-shaped handle.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
