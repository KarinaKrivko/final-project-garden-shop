import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import ProductByCategory from "../../components/ProductByCategory";
const mockStore = configureStore([]);

describe("ProductByCategory", () => {
    test("should render ProductByCategory component with correct title", async () => {
        const store = mockStore({
            products: [],
            category: {
                category: {
                    category: {
                        id: "1",
                        title: "Category 1",
                    },
                    data: [
                        {
                            id: "1",
                            title: "Product 1",
                            description: "Description 1",
                            price: 100,
                        },
                        {
                            id: "2",
                            title: "Product 2",
                            description: "Description 2",
                            price: 200,
                        },
                    ],
                },
            },
            categories: {
                loading: false,
                error: null,
            },
        });
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductByCategory id="1" />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            const titleElement = screen.getByText("Category 1");
            expect(titleElement).toBeInTheDocument();
        });
    });
});
