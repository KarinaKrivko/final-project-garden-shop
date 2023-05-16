import React, {useEffect} from "react";
import s from "./styles.module.css";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../actions/categoriesActions";
import {API_URL} from "../../constants";


function Catalog() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
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
            <div className={s.grid_cont}>
                {categories.slice(0, 4).map((it) => {
                    let url = `${API_URL}${it.image}`;
                    return (
                        <Link to={`categories/${it.id}`} key={it.id}>
                            <div >
                                <div>
                                    <img src={url} alt={it.image}></img>
                                </div>
                                <div className={s.grid_cont}>
                                    <p key={it.id} data-testid="category-title">{it.title}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Catalog;
