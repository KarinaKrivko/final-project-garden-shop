import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, fetchProductsSuccess} from "../../actions/productsActions";
import s from "./styles.module.css";
import ProductItem from "../../components/ProductItem";
import _ from "lodash";
import Filters from "../../components/Filters";


function AllProductsPage() {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

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
    }, []);

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


    return (
        <div>
            <h1 className={s.pageName}>All products</h1>
            <Filters showDiscountCmp={true} onBlur={handleFilterChange} onChangeCheckbox={handleDiscountCheckBox} value={selectedOption}
                     onChangeSelect={handleOptionChange}/>
            <div className={s.productContainer}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default AllProductsPage;





