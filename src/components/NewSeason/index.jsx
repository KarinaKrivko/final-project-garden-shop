import React from "react";
import s from "./styles.module.css";
import flowers from "./media/flowers.png";
import { Link } from "react-router-dom";

function NewSeason() {
  return (
    <div>
      <div className={s.background}>
        <h1 className={s.discount}>Sale</h1>
        <p className={s.newSeason}>New Season</p>
        <div>
          <Link to="/sale">
            <button className={s.btn1}>Sale</button>
          </Link>
        </div>
        <img className={s.flowers} src={flowers} alt="flowers" />
      </div>
    </div>
  );
}

export default NewSeason;
