import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom/extend-expect";
import Sale from "../../components/Sale";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([thunk]);

describe("Sale component", () => {
    const products = [
        {
            id: 1,
            title: "Savannah Summer Annual Collection",
            price: 53,
            discont_price: 50,
            description:
                "We love this fusion of colorful blossoms, created by combining some of the most fl.",
            image: "/product_img/1.jpeg",
            createdAt: "2022-10-02T14:43:29.000Z",
            updatedAt: "2022-10-02T14:43:29.000Z",
            categoryId: 1,
        },
        {
            id: 2,
            title: "Angelonia angustifolia Archangel™ White",
            price: 10.75,
            discont_price: null,
            description:
                "Angelonia angustifolia Archangel™ White displays pristine white blossoms arranged on tall stems that sparkle above clean, glossy, dark green foliage. These sturdy, well-branched plants add texture and commanding presence to borders, containers, and flower arrangements.",
            image: "/product_img/2.jpeg",
            createdAt: "2022-10-02T14:43:29.000Z",
            updatedAt: "2022-10-02T14:43:29.000Z",
            categoryId: 1,
        },
    ];

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
        expect(saleTitles).toHaveLength(2);
        expect(saleTitles[0]).toHaveTextContent("Savannah Summer Annual Collection");
        expect(saleTitles[1]).toHaveTextContent("Angelonia angustifolia Archangel™ White");
    });
});
