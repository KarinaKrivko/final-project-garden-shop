import s from "./styles.module.css";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import {fetchProducts, fetchProductsSuccess} from "../../actions/productsActions";
import {useDispatch, useSelector} from "react-redux";

function Filters(props) {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    const [selectedOption, setSelectedOption] = useState("");
    const [sortedProducts, setSortedProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === "price-low-high") {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            setSortedProducts(sortedProducts);
        } else {
            if (event.target.value === "price-high-low") {
                const sortedProducts = [...products].sort((a, b) => b.price - a.price);
                setSortedProducts(sortedProducts);
            }
        }
    };


    const handleFilterChange = (event) => {
        if (event.keyCode!==13) return;

        const priceFrom = document.getElementById('priceLow').value;
        const priceTo = document.getElementById('priceHigh').value;

        let low = _.toInteger(priceFrom);
        let high = _.toInteger(priceTo);

        if (high === 0) return
        const filteredProducts = originalProducts
            .filter((it) => it.price <= high)
            .filter((it) => it.price > low)

        setFilteredProducts(filteredProducts)
    }

    const handleDiscountCheckBox = (event) => {
        setSelectedOption(event.target.value);
        const discountProducts = products.filter((el) => el.discont_price != null);
        if (event.target.checked) {
            setDiscountProducts(discountProducts);
            setOriginalProducts(products);
            dispatch(fetchProductsSuccess(discountProducts));
        } else {
            setSelectedOption("");
            setDiscountProducts(originalProducts);
            dispatch(fetchProductsSuccess(originalProducts));
        }
    };

    useEffect(() => {
        setOriginalProducts(products);
    }, [products]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProductsSuccess(sortedProducts));
    }, [sortedProducts, dispatch]);

    useEffect(() => {
        dispatch(fetchProductsSuccess(discountProducts));
    }, [discountProducts, dispatch]);

    useEffect(() => {
        dispatch(fetchProductsSuccess(filteredProducts));
    }, [filteredProducts, dispatch]);

    return <div>
        <div className={s.tools_container}>
            <div className={s.price}>Price</div>
            <input id="priceLow" className={s.from} onKeyDown={handleFilterChange} onBlur={handleFilterChange} placeholder="from"></input>
            <input id="priceHigh" className={s.to} onKeyDown={handleFilterChange} onBlur={handleFilterChange} placeholder="to"></input>

            {props.showDiscountCmp===true &&
                <>
                    <div className={s.discounted}>Discounted items</div>
                    <input id="discountCheckBox"
                           type={"checkbox"}
                           onChange={handleDiscountCheckBox}
                           className={s.inputForDiscounted}
                           data-testid="discount-checkbox"
                    />
                </>
            }
            <label className={s.sorted} htmlFor="my-select">
                Sorted
            </label>
            <select
                className={s.default}
                id="my-select"
                value={props.value}
                onChange={handleOptionChange}
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
    value: PropTypes.string,
    showDiscountCmp: PropTypes.bool
};

export default Filters;