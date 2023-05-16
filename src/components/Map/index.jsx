import React from "react";
import s from "./styles.module.css";
import Iframe from "react-iframe";

export default function Map() {
  return (
    <div className={s.map}>
      <Iframe
        src="https://wego.here.com/directions/mix//Linkstra%C3%9Fe-2,-Tiergarten,-10785-%D0%91%D0%B5%D1%80%D0%BB%D0%B8%D0%BD:here:af:streetsection:-M4Hg-NwFoivpC1mWen-BB:CgcIBCCC-Y5QEAEaATI?map=52.50788,13.37522,15,normal"
        width="1345"
        height="525"
      ></Iframe>
    </div>
  );
}
