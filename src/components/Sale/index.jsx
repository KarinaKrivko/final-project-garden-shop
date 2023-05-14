import React, {useEffect} from "react";
import s from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";

function Sale(props) {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <div className={s.sale_container}>
            <h2 className={s.sale}>Sale</h2>
            <div className={s.grid_container}>
                {products.slice(0, 3).map((it) => {
                    let url = `${API_URL}${it.image}`;
                    return (
                        <div key={it.id} >
                            <Link to={`/description/${it.id}`}>
                            <div>
                                <img src={url} alt={it.image}></img>
                            </div>
                            </Link>
                            <div className={s.grid_container}>
                                <p key={it.id} data-testid="sale-title">{it.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sale;
