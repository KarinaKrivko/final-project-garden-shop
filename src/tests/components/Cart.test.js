import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Cart from "../../components/Cart";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("Cart component", () => {
    it("should render 'No items in the cart.' if there are no items in the cart", () => {
        const store = mockStore({
            categories: {
                counter: 42
            },
        });

        render(
            <Provider store={store}>
                <Cart/>
            </Provider>
        );

        expect(screen.getByText("No items in the cart.")).toBeInTheDocument();
    });

    it("should render cart items correctly", () => {
        const store = mockStore({
            categories: {
                counter: 42
            },
        });

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
            <Provider store={store}>
                <BrowserRouter>
                    <Cart/>
                </BrowserRouter>
            </Provider>
        )

        // Assert
        expect(screen.queryByText("No items in the cart.")).not.toBeInTheDocument();
        expect(screen.getByText(cartItems[0].data.title)).toBeInTheDocument();
        expect(screen.getByTestId("product-price-1")).toBeInTheDocument();
        expect(screen.getByText(cartItems[1].data.title)).toBeInTheDocument();
        expect(screen.getByTestId("product-price-2")).toBeInTheDocument();
    });
});
