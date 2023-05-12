import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Categories from "../../components/Categories";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([thunk]);

describe("Categories component", () => {
    it("renders categories correctly", async () => {
        const store = mockStore({
            categories: {
                categories: [
                    { id: 1, title: "Category 1", image: "image1.jpg" },
                    { id: 2, title: "Category 2", image: "image2.jpg" },
                ],
                loading: false,
                error: null,
            },
        });
        render(
            <Provider store={store}>
                <Categories />
            </Provider>
        );
        const category1Element = await screen.findByText("Category 1");
        expect(category1Element).toBeInTheDocument();
        const category2Element = await screen.findByText("Category 2");
        expect(category2Element).toBeInTheDocument();
    });

    it("renders error message when loading fails", async () => {
        const store = mockStore({
            categories: {
                categories: [],
                loading: false,
                error: "Failed to load categories",
            },
        });
        render(
            <Provider store={store}>
                <Categories />
            </Provider>
        );
        const errorMessageElement = await screen.findByText(
            "Error: Failed to load categories"
        );
        expect(errorMessageElement).toBeInTheDocument();
    });
});
