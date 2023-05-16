import React from "react";
import s from "./styles.module.css";
import flowers from "./media/flowers.png";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@mui/material";

function NewSeason() {
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    return (
        <div className={s.background}>
            <div className={s.discount}><h1>Sale</h1></div>
            <span className={s.newSeason}>New Season</span>
            <div className={s.btn1}>
                <Link to="/sale">
                    <button className={s.btn}>Sale</button>
                </Link>
            </div>
            {!isSmallScreen ? <div className={s.flowers}><img src={flowers} alt="flowers"/></div> : <></>}

        </div>
    );
}

export default NewSeason;
