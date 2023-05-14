import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AllProductsPage from "../../pages/AllProductsPage";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import {fetchProductsSuccess} from "../../actions/productsActions";

const mockStore = configureStore([]);
const mockProducts = [
    { id: 1, price: 50, discont_price: null },
    { id: 2, price: 100, discont_price: 80 },
    { id: 3, price: 150, discont_price: null },
];

describe("AllProductsPage", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            products: { products: mockProducts }
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllProductsPage />
                </BrowserRouter>
            </Provider>,
        );
    });

    it("renders products", () => {
        mockProducts.forEach((product) => {
            const productPrice = "product-price-"+product.id;
            expect(screen.getByTestId(productPrice)).toBeInTheDocument();
        });
    });

    it("sorts products by price low to high", () => {
        fireEvent.change(screen.getByTestId("sort-select"), {
            target: { value: "price-low-high" }
        });

        expect(store.dispatch).toHaveBeenCalledWith(
            fetchProductsSuccess(
                expect.arrayContaining([
                    expect.objectContaining({ id: 1, price: 50 }),
                    expect.objectContaining({ id: 2, price: 100 }),
                    expect.objectContaining({ id: 3, price: 150 })
                ])
            )
        );
    });

    it("sorts products by price high to low", () => {
        fireEvent.change(screen.getByTestId("sort-select"), {
            target: { value: "price-high-low" }
        });

        expect(store.dispatch).toHaveBeenCalledWith(
            fetchProductsSuccess(
                expect.arrayContaining([
                    expect.objectContaining({ id: 3, price: 150 }),
                    expect.objectContaining({ id: 2, price: 100 }),
                    expect.objectContaining({ id: 1, price: 50 })
                ])
            )
        );
    });

    it("filters products by price range", () => {
        fireEvent.input(screen.getByPlaceholderText("from"), { target: { value: "60" } });
        fireEvent.input(screen.getByPlaceholderText("to"), { target: { value: "120" } });
        fireEvent.blur(screen.getByPlaceholderText("to"));

        expect(store.dispatch).toHaveBeenCalledWith(
            fetchProductsSuccess(
                expect.arrayContaining([expect.objectContaining({ id: 2, price: 100 })])
            )
        );
    });

    it("shows only discounted products when checkbox is checked", () => {
        fireEvent.click(screen.getByTestId("discount-checkbox"));

        expect(store.dispatch).toHaveBeenCalledWith(
            fetchProductsSuccess(
                expect.arrayContaining([expect.objectContaining({ id: 2, price: 100, discont_price: 80 })])
            )
        );
    });

    it("shows all products when checkbox is unchecked", () => {
        fireEvent.click(screen.getByTestId("discount-checkbox"));
        fireEvent.click(screen.getByTestId("discount-checkbox"));

        expect(store.dispatch).toHaveBeenCalledWith(
            fetchProductsSuccess(expect.arrayContaining(mockProducts))
        );
    });
});
