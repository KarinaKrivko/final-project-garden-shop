import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom/extend-expect";
import Catalog from '../../components/Catalog';
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([thunk]);

describe('Catalog component', () => {
    const categories = [
        {
            id: 1,
            title: 'Fertilizer',
            image: '/category_img/1.png',
            createdAt: '2022-10-02T14:43:29.000Z',
            updatedAt: '2022-10-02T14:43:29.000Z',
        },
        {
            id: 2,
            title: 'Planting material',
            image: '/category_img/2.png',
            createdAt: '2022-10-02T14:43:29.000Z',
            updatedAt: '2022-10-02T14:43:29.000Z',
        },
        {
            id: 3,
            title: 'Protective products',
            image: '/category_img/3.png',
            createdAt: '2022-10-02T14:43:29.000Z',
            updatedAt: '2022-10-02T14:43:29.000Z',
        },
        {
            id: 4,
            title: 'Tools',
            image: '/category_img/4.png',
            createdAt: '2022-10-02T14:43:29.000Z',
            updatedAt: '2022-10-02T14:43:29.000Z',
        },
    ];
    let store= mockStore({
        categories: {
            categories,
            loading: false,
            error: null,
        },
    });


    test('renders the catalog component with categories', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Catalog />
                </MemoryRouter>
            </Provider>
        );

        const categoryTitles = screen.getAllByTestId('category-title');
        expect(categoryTitles).toHaveLength(4);
        expect(categoryTitles[0]).toHaveTextContent('Fertilizer');
        expect(categoryTitles[1]).toHaveTextContent('Planting material');
        expect(categoryTitles[2]).toHaveTextContent('Protective products');
        expect(categoryTitles[3]).toHaveTextContent('Tools');
    });
});
