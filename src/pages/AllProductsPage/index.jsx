import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";
import s from "./styles.module.css";
import ProductItem from "../../components/ProductItem";
import Filters from "../../components/Filters";


function AllProductsPage() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <h1 className={s.pageName}>All products</h1>
            <Filters showDiscountCmp={true} />
            <div className={s.productContainer}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default AllProductsPage;





