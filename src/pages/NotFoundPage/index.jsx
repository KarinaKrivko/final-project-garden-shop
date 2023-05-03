import React from 'react';
import notFoundPage from "./media/notFound.png";
import s from "./styles.module.css";

function NotFoundPage(props) {
    return (
      <img className={s.img_page} src={notFoundPage} alt="not found" />
    );
}

export default NotFoundPage;