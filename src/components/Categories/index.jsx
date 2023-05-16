import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./styles.module.css";
import {fetchCategories} from "../../actions/categoriesActions";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";

function Categories(props) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector((state) => state.categories.loading);
    const error = useSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className={s.categories_container}>
            <h2 className={s.categories}>Categories</h2>
            {categories && (
                    <div className={s.grid_container}>

                        {categories.map((category, index) => {
                            let src = `${API_URL}/${category.image}`;
                            return (
                                <Link to={`/categories/${category.id}`} key={category.id}>
                                    <div className={s.contentItem}>
                                        <div><img src={src} alt={category.title}></img></div>
                                        <div>{category.title}</div>
                                    </div>
                                </Link>
                            );
                        })}

                    </div>
            )}
        </div>
    );
}

export default Categories;
