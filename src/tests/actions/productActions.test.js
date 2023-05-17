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
    fetchProduct,
} from '../../actions/productActions';
import {waitFor} from "@testing-library/react";

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('productActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('should dispatch FETCH_PRODUCT_SUCCESS when fetching product has been done', async () => {
        const productId = 1;
        const product = {
            id: 1,
            title: "Product 1",
            price: 10.99,
            image: "/images/product1.jpg",
            description: "This is a description for Product 1.",
        };
        const expectedActions = [
            { type: FETCH_PRODUCT_REQUEST },
            { type: FETCH_PRODUCT_SUCCESS, payload: product },
        ];
        axios.get.mockResolvedValue({ data: product });

        await store.dispatch(fetchProduct(productId));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch FETCH_PRODUCT_FAILURE when fetching product has failed', async () => {
        const productId = 1;
        const errorMessage = 'Failed to fetch product';
        const expectedActions = [
            { type: FETCH_PRODUCT_REQUEST },
            { type: FETCH_PRODUCT_FAILURE, payload: errorMessage },
        ];
        axios.get.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(fetchProduct(productId));
        await waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should create an action to fetch product request', () => {
        const expectedAction = { type: FETCH_PRODUCT_REQUEST };
        expect(fetchProductRequest()).toEqual(expectedAction);
    });

    it('should create an action to fetch product success', () => {
        const product = {
            id: 1,
            title: "Product 1",
            price: 10.99,
            image: "/images/product1.jpg",
            description: "This is a description for Product 1.",
        };
        const expectedAction = { type: FETCH_PRODUCT_SUCCESS, payload: product };
        expect(fetchProductSuccess(product)).toEqual(expectedAction);
    });

    it('should create an action to fetch product failure', () => {
        const error = 'Failed to fetch product';
        const expectedAction = { type: FETCH_PRODUCT_FAILURE, payload: error };
        expect(fetchProductFailure(error)).toEqual(expectedAction);
    });
});
