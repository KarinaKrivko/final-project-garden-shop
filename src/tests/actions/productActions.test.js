import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure,
    fetchProducts
} from '../../actions/productActions';
import {waitFor} from "@testing-library/react";

const mockStore = configureMockStore([thunk]);

jest.mock('axios');
describe('productActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('should dispatch FETCH_PRODUCT_SUCCESS when fetching products has been done', async () => {
        const products = [
            {
                id: 1,
                title: "Product 1",
                price: 10.99,
                image: "/images/product1.jpg",
                description: "This is a description for Product 1.",
            },
            {
                id: 2,
                title: "Product 2",
                price: 15.99,
                image: "/images/product2.jpg",
                description: "This is a description for Product 2.",
            },
            {
                id: 3,
                title: "Product 3",
                price: 19.99,
                image: "/images/product3.jpg",
                description: "This is a description for Product 3.",
            },
        ];
        const expectedActions = [
            { type: FETCH_PRODUCT_REQUEST },
            { type: FETCH_PRODUCT_SUCCESS, payload: products }
        ];
        axios.get.mockResolvedValue({ data: products });

        await store.dispatch(fetchProducts());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch FETCH_PRODUCT_FAILURE when fetching products has failed', async () => {
        const errorMessage = 'Failed to fetch products';
        const expectedActions = [
            { type: FETCH_PRODUCT_REQUEST },
            { type: FETCH_PRODUCT_FAILURE, payload: errorMessage }
        ];
        axios.get.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(fetchProducts());
        // wait for all dispatched actions to complete
        await waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should create an action to fetch products request', () => {
        const expectedAction = { type: FETCH_PRODUCT_REQUEST };
        expect(fetchProductRequest()).toEqual(expectedAction);
    });

    it('should create an action to fetch products success', () => {
        const products = [
            {
                id: 1,
                title: "Product 1",
                price: 10.99,
                image: "/images/product1.jpg",
                description: "This is a description for Product 1.",
            }
        ];
        const expectedAction = { type: FETCH_PRODUCT_SUCCESS, payload: products };
        expect(fetchProductSuccess(products)).toEqual(expectedAction);
    });

    it('should create an action to fetch products failure', () => {
        const error = 'Failed to fetch products';
        const expectedAction = { type: FETCH_PRODUCT_FAILURE, payload: error };
        expect(fetchProductFailure(error)).toEqual(expectedAction);
    });
});
