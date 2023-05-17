import React from "react";
import {render, screen} from "@testing-library/react";
import ProductItem, {AddToCartButton} from "../../components/ProductItem";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";

jest.mock("react-redux");

describe("ProductItem", () => {
    test("should render ProductItem without errors", () => {
        const product = {id: 1, title: "Product 1", image: "image1.jpg"};

        render(
            <BrowserRouter>
                <ProductItem product={product}/>
            </BrowserRouter>
        );

        const titleElement = screen.getByText("Product 1");
        expect(titleElement).toBeInTheDocument();

        const linkElement = screen.getByRole("link");
        expect(linkElement).toBeInTheDocument();

        const imageElement = screen.getByAltText("image1.jpg");
        expect(imageElement).toBeInTheDocument();
    });

});
