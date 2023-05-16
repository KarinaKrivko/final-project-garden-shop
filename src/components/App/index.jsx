import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from '../Header';
import MainPage from '../../pages/MainPage';
import CategoriesPage from '../../pages/CategoriesPage';
import NotFoundPage from '../../pages/NotFoundPage';
import AllProductsPage from '../../pages/AllProductsPage';
import AllSalesPage from '../../pages/AllSalesPage';
import Footer from '../Footer';
import Map from '../Map';
import ProductDescription from "../ProductDescription";
import CartPage from '../../pages/CartPage';
import ProductByCategory from '../../components/ProductByCategory'


function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/products" element={<AllProductsPage/>}/>
                <Route path="/sales/all" element={<AllSalesPage/>}/>
                <Route path="/categories" element={<CategoriesPage/>}/>
                <Route
                    path="/categories/:id"
                    element={<ProductByCategory/>}
                />
                <Route path="/*" element={<NotFoundPage/>}/>
                <Route path="/sale" element={<AllSalesPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route
                    path="/description/:id"
                    element={<ProductDescription/>}
                />
                <Route path="/bucket" element={<CartPage/>}/>
            </Routes>
            <Footer/>
            <Map/>
        </div>
    );
}

export default App;
