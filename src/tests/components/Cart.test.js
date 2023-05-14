import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Cart from "../../components/Cart";
import {BrowserRouter} from "react-router-dom";

describe("Cart component", () => {
    it("should render 'No items in the cart.' if there are no items in the cart", () => {
        render(<Cart/>);

        expect(screen.getByText("No items in the cart.")).toBeInTheDocument();
    });

    it("should render cart items correctly", () => {
        // Arrange
        const cartItems = [
            {
                count: 1,
                data: {
                    id: 1,
                    title: "Product 1",
                    price: 10,
                    discont_price: 9,
                    description: "Product 1 description",
                    image: "/product_img/1.jpg",
                }
            },
            {
                count: 1,
                data: {
                    id: 2,
                    title: "Product 2",
                    price: 15,
                    discont_price: 12,
                    description: "Product 2 description",
                    image: "/product_img/2.jpg",
                }
            },
        ];
        localStorage.setItem("product_1", JSON.stringify(cartItems[0]));
        localStorage.setItem("product_2", JSON.stringify(cartItems[1]));

        // Act
        render(
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>
        )

        // Assert
        expect(screen.queryByText("No items in the cart.")).not.toBeInTheDocument();
        expect(screen.getByText(cartItems[0].data.description)).toBeInTheDocument();
        expect(screen.getByTestId("cart-price-1")).toBeInTheDocument();
        expect(screen.getByText(cartItems[1].data.description)).toBeInTheDocument();
        expect(screen.getByTestId("cart-price-2")).toBeInTheDocument();
    });
});
