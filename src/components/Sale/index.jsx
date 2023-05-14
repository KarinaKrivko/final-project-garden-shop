import React, {useEffect} from "react";
import s from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";
import {API_URL} from "../../constants";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import _ from "lodash";


function Sale(props) {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (!products || products.length === 0) {
        return <div>Loading...</div>
    }

    let randomizedProducts = _.range(0,3).map((number)=>{
        let index = _.random(30);
        return products[index]
    })
    return (
        <div className={s.sale_container}>
            <h2 className={s.sale}>Sale</h2>
            <div className={s.grid_container}>
                {
                    randomizedProducts.map((it) => {
                    let url = `${API_URL}${it.image}`;
                    return (
                        <SaleItem key={it.id} it={it} src={url}/>
                    );
                })}
            </div>
        </div>
    );
}

export default Sale;

function SaleItem(props) {
    return <div>
        <Link to={`/description/${props.it.id}`}>
            <div>
                <img src={props.src} alt={props.it.image}></img>
            </div>
        </Link>
        <div className={s.grid_container}>
            <p data-testid="sale-title">{props.it.title}</p>
        </div>
    </div>;
}

SaleItem.propTypes = {
    it: PropTypes.any,
    src: PropTypes.string
};
