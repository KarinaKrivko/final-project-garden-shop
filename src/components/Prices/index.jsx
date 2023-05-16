import React from 'react';
import s from "./styles.module.css";
import * as PropTypes from "prop-types";
import _ from "lodash";


export default function Prices(props) {
    const item = props.props
    if (!item) {
        return null;
    }
    const discount_price = item.discont_price;
    const price = item.price;
    const discount_percent = _.round((1 - (discount_price / price)) * 100, 0);

    return (
        <div>
            <div className={s.priceGrid}>
                {item.discont_price ? (
                    <div className={s.priceGrid}>
                        <div className={s.normalPrice}>{item.discont_price}$</div>
                        <div data-testid={`product-price-${item.id}`} className={s.pastPrice}>{item.price}$</div>
                        <div className={s.percentage}>
                            -{discount_percent}%
                        </div>
                    </div>
                ) : (
                    <div data-testid={`product-price-${item.id}`}  className={s.normalPrice}>{item.price}$</div>
                )}

            </div>
        </div>
    );
}

Prices.propTypes = {
    props: PropTypes.any,

};
    
    