import React, {useEffect} from "react";
import s from "./styles.module.css";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../actions/categoriesActions";
import {API_URL} from "../../constants";


function Catalog() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

  const handleClick = () => {

  };
    return (
        <div className={s.catalog_container}>
            <h2>Catalog</h2>

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
