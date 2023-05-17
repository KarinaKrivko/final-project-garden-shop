import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductDescription from "../../components/ProductDescription";

describe("ProductDescription", () => {
    const mockStore = configureStore([]);

    test("should render ProductDescription without errors", () => {
        const store = mockStore({
            product: {
                product: [
                    {
                        id: 1,
                        title: "Product 1",
                        description: "Description 1",
                        price: 100,
                        discont_price: 90,
                        image: "/images/product1.png",
                    },
                ],
            },
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <ProductDescription />
            </Provider>
        );

        const productNameElement = screen.getByText("Product 1");
        expect(productNameElement).toBeInTheDocument();
    });

    test("should render 'Loading...' when product is not available", () => {
        const store = mockStore({
            product: {
                product: [],
            },
        });
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <ProductDescription />
            </Provider>
        );

        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
    });
});
