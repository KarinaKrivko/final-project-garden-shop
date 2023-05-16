import s from "./styles.module.css";
import * as PropTypes from "prop-types";
import React from "react";

 function Filters(props) {
    return <div>
        <div className={s.tools_container}>
        <div className={s.price}>Price</div>
            <input id="priceLow" className={s.from} onBlur={props.onBlur} placeholder="from"></input>
            <input id="priceHigh" className={s.to} onBlur={props.onBlur} placeholder="to"></input>
            <div className={s.discounted}>Discounted items</div>
            <input id="discountCheckBox"
                   type={"checkbox"}
                   onChange={props.onChangeCheckbox}
                   className={s.inputForDiscounted}
                   data-testid="discount-checkbox"
            />
            <label className={s.sorted} htmlFor="my-select">
                Sorted
            </label>
            <select
                className={s.default}
                id="my-select"
                value={props.value}
                onChange={props.onChangeSelect}
                data-testid="sort-select"
            >
                <option value="by default">by default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
            </select>
        </div>
    </div>;
}

Filters.propTypes = {
    onBlur: PropTypes.func,
    onChangeCheckbox: PropTypes.func,
    value: PropTypes.string,
    onChangeSelect: PropTypes.func
};

 export default Filters;