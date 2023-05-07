import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchCategories,
} from '../../actions/categoryActions';
import {waitFor} from "@testing-library/react";

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Category Actions', () => {
    beforeEach(() => {
        axios.get.mockReset();
    });

    test('should create an action to request fetching categories', () => {
        const expectedAction = { type: FETCH_CATEGORIES_REQUEST };
        expect(fetchCategoriesRequest()).toEqual(expectedAction);
    });

    test('should create an action to fetch categories success', () => {
        const categories = [{ id: 1, name: 'Test Category' }];
        const expectedAction = {
            type: FETCH_CATEGORIES_SUCCESS,
            payload: categories,
        };
        expect(fetchCategoriesSuccess(categories)).toEqual(expectedAction);
    });

    test('should create an action to fetch categories failure', () => {
        const error = 'Failed to fetch categories';
        const expectedAction = {
            type: FETCH_CATEGORIES_FAILURE,
            payload: error,
        };
        expect(fetchCategoriesFailure(error)).toEqual(expectedAction);
    });

    test('should fetch categories', async () => {
        const categories = [{ id: 1, name: 'Test Category' }];
        axios.get.mockResolvedValue({ data: categories });

        const expectedActions = [
            { type: FETCH_CATEGORIES_REQUEST },
            { type: FETCH_CATEGORIES_SUCCESS, payload: categories },
        ];

        const store = mockStore({ categories: [] });

        await store.dispatch(fetchCategories());
        expect(store.getActions()).toEqual(expectedActions);
    });


    test('should handle errors when fetching categories', async () => {
        const errorMessage = 'Failed to fetch categories';
        axios.get.mockRejectedValue(new Error(errorMessage));

        const expectedActions = [
            { type: FETCH_CATEGORIES_REQUEST },
            { type: FETCH_CATEGORIES_FAILURE, payload: errorMessage },
        ];

        const store = mockStore({ categories: [] });

        await store.dispatch(fetchCategories());

        // wait for all dispatched actions to complete
        await waitFor(() => expect(store.getActions()).toEqual(expectedActions));
    });
});
