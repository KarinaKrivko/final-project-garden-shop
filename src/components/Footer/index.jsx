import React from "react";
import s from "./styles.module.css";
import {FaInstagram, FaWhatsapp} from "react-icons/fa";

function Footer() {

    return (
        <div className={s.footer_container}>

            <div className={s.container_1}>
                <address className={s.contact}>Contact</address>
                <address className={s.phone}>+49 999 999 99 99</address>
                <div className={s.icons_container}>
                    <a className={s.icon} href="https://www.instagram.com/">
                        <FaInstagram/>
                    </a>
                    <a className={s.icon} href="https://wa.me/1234567890">
                        <FaWhatsapp/>
                    </a>
                </div>
                <div className={s.icon_names}>
                    <p>Instagram</p>
                    <p>Whatsapp </p>
                </div>
            </div>

            <div className={s.container_2}>
                <address className={s.address}>Address</address>
                <address className={s.city}>
                    <a href="https://www.google.com/maps/place/Linkstraße+2,+10785+Berlin,+Germany/">
                        Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
                    </a>
                </address>

                <p className={s.regime}>Working Hours:</p>
                <p className={s.workHours}>24 hours a day</p>
            </div>
        </div>
    );
}

export default Footer;
