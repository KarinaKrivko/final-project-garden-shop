import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import '@testing-library/jest-dom/extend-expect';
import AllSalesPage from "../../pages/AllSalesPage";
import {BrowserRouter} from "react-router-dom";

describe("AllSalesPage", () => {
    const mockStore = configureStore([]);

    test("should render AllSalesPage without errors", () => {
        const store = mockStore({
            products: {
                products: [],
            },
        });
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <AllSalesPage/>
            </Provider>
        );

        const allSalesPageElement = screen.getByText("Products with sale");
        expect(allSalesPageElement).toBeInTheDocument();
    });

    test("should only show products with discount", () => {
        const store = mockStore({
            products: {
                products: [
                    {
                        id: 1,
                        title: "Product 1",
                        description: "Description 1",
                        price: 100,
                        discont_price: 90,
                        image: "/images/product1.png",
                    },
                    {
                        id: 2,
                        title: "Product 2",
                        description: "Description 2",
                        price: 50,
                        discont_price: null,
                        image: "/images/product2.png",
                    },
                    {
                        id: 3,
                        title: "Product 3",
                        description: "Description 3",
                        price: 150,
                        discont_price: 120,
                        image: "/images/product3.png",
                    },
                    {
                        id: 4,
                        title: "Product 4",
                        description: "Description 4",
                        price: 150,
                        discont_price: 120,
                        image: "/images/product4.png",
                    },
                ],
            },
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllSalesPage/>
                </BrowserRouter>
            </Provider>
        );

        const productTitles = screen.getAllByText(/Product/);
        expect(productTitles).toHaveLength(4);
    });
});
