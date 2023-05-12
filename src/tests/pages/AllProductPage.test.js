import React from 'react';
import { fireEvent, render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AllProductsPage from '../../pages/AllProductsPage';

import '@testing-library/jest-dom/extend-expect';


const mockStore = configureStore([thunk]);

describe('AllProductsPage Page', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            products: {
                products: [
                    {
                        id: 1,
                        title: 'Product 1',
                        description: ' description 1',
                        price: 100,
                        discont_price: 90,
                        image: '/images/product1.png',
                    },
                    {
                        id: 2,
                        title: 'Product 2',
                        description: ' description 2',
                        price: 50,
                        discont_price: null,
                        image: '/images/product2.png',
                    },
                    {
                        id: 3,
                        title: 'Product 3',
                        description: ' description 3',
                        price: 150,
                        discont_price: 120,
                        image: '/images/product3.png',
                    },
                ],
            },
        });
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <AllProductsPage />
            </Provider>
        );
    });

    test('should render products', async () => {

        const productTitles = await screen.findAllByText(/Product/);
        expect(productTitles).toHaveLength(3);
    });

    test('should sort products by price from low to high', () => {
        const selectElement = screen.getByLabelText('Sorted');
        fireEvent.change(selectElement, { target: { value: 'price-low-high' } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'FETCH_PRODUCTS_SUCCESS',
            payload: [
                {
                    id: 2,
                    title: 'Product 2',
                    description: ' description 2',
                    price: 50,
                    discont_price: null,
                    image: '/images/product2.png',
                },
                {
                    id: 1,
                    title: 'Product 1',
                    description: ' description 1',
                    price: 100,
                    discont_price: 90,
                    image: '/images/product1.png',
                },
                {
                    id: 3,
                    title: 'Product 3',
                    description: ' description 3',
                    price: 150,
                    discont_price: 120,
                    image: '/images/product3.png',
                },
            ],
        });
    });

    test('should sort products by price from high to low', () => {
        const selectElement = screen.getByLabelText('Sorted');
        fireEvent.change(selectElement, { target: { value: 'price-high-low' } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'FETCH_PRODUCTS_SUCCESS',
            payload: [
                {
                    id: 3,
                    title: 'Product 3',
                    description: ' description 3',
                    price: 150,
                    discont_price: 120,
                    image: '/images/product3.png',
                },
                {
                    id: 1,
                    title: 'Product 1',
                    description: ' description 1',
                    price: 100,
                    discont_price: 90,
                    image: '/images/product1.png',
                },
                {
                    id: 2,
                    title: 'Product 2',
                    description: ' description 2',
                    price: 50,
                    discont_price: null,
                    image: '/images/product2.png',
                },

            ],
        });
    });
});
