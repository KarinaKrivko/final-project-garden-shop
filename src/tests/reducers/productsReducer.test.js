import productsReducer from '../../reducers/productsReducer';
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../../actions/productsActions';

describe('productsReducer', () => {
    const initialState = {
        loading: false,
        products: [],
        error: ''
    };

    it('should return the initial state', () => {
        expect(productsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_PRODUCTS_REQUEST', () => {
        const action = {
            type: FETCH_PRODUCTS_REQUEST
        };
        const expectedState = {
            ...initialState,
            loading: true
        };
        expect(productsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FETCH_PRODUCTS_SUCCESS', () => {
        const products = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' }
        ];
        const action = {
            type: FETCH_PRODUCTS_SUCCESS,
            payload: products
        };
        const expectedState = {
            ...initialState,
            loading: false,
            products
        };
        expect(productsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FETCH_PRODUCTS_FAILURE', () => {
        const error = 'Failed to fetch products';
        const action = {
            type: FETCH_PRODUCTS_FAILURE,
            payload: error
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error
        };
        expect(productsReducer(initialState, action)).toEqual(expectedState);
    });
});
