import React from "react";
import s from "./styles.module.css";
import flowers from "./media/flowers.png";
import {Link} from "react-router-dom";

function NewSeason() {
    return (
        <div className={s.background}>
            <div className={s.discount}><h1>Sale</h1></div>
            <span className={s.newSeason}>New Season</span>
            <div className={s.btn1}>
                <Link to="/sale">
                    <button className={s.btn}>Sale</button>
                </Link>
            </div>
            <div className={s.flowers} ><img src={flowers} alt="flowers"/></div>
        </div>
    );
}

export default NewSeason;
