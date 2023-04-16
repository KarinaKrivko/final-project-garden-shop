import React from "react";
import { Route, Routes } from "react-router-dom";
import AllProductsPage from "../../pages/AllProductsPage";
import CategoriesPage from "../../pages/CategoriesPage";
import MainPage from "../../pages/MainPage";
import NotFoundPage from "../../pages/NotFoundPage";
import SaleProductsPage from "../../pages/SaleProductsPage";
import ToolsPage from "../../pages/ToolsPage";
import Footer from "../Footer";
import Header from "../Header";
import Map from "../Map";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products/all" element={<AllProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/sale" element={<SaleProductsPage/>} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>

      <Footer />
      
      <Map />
    </div>
  );
}

export default App;
