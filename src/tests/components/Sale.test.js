import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom/extend-expect";
import Sale from "../../components/Sale";
import {MemoryRouter} from "react-router-dom";
import testProducts from "../testConstants";

const mockStore = configureStore([thunk]);

describe("Sale component", () => {
    const products = testProducts

    let store = mockStore({
        products: {
            products,
            loading: false,
            error: null,
        },
    });

    test("renders the Sale component with products", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Sale/>
                </MemoryRouter>
            </Provider>
        );

        const saleTitles = screen.getAllByTestId("sale-title");
        expect(saleTitles).toHaveLength(3);
        expect(saleTitles[0]).toBeInTheDocument();
        expect(saleTitles[1]).toBeInTheDocument();
        expect(saleTitles[2]).toBeInTheDocument();
    });
});
