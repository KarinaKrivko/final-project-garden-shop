import productReducer from '../../reducers/productReducer';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE
} from '../../actions/productActions';

describe('productReducer', () => {
    it('should return the initial state', () => {
        expect(productReducer(undefined, {})).toEqual({
            product: {},
            loading: false,
            error: null
        });
    });

    it('should handle FETCH_PRODUCT_REQUEST', () => {
        expect(productReducer(undefined, { type: FETCH_PRODUCT_REQUEST })).toEqual({
            product: {},
            loading: true,
            error: null
        });
    });

    it('should handle FETCH_PRODUCT_SUCCESS', () => {
        const product = { id: 1, name: 'Product 1', price: 10 };
        expect(productReducer(undefined, { type: FETCH_PRODUCT_SUCCESS, payload: product })).toEqual({
            product,
            loading: false,
            error: null
        });
    });

    it('should handle FETCH_PRODUCT_FAILURE', () => {
        const error = 'Failed to fetch product';
        expect(productReducer(undefined, { type: FETCH_PRODUCT_FAILURE, payload: error })).toEqual({
            product: {},
            loading: false,
            error
        });
    });
});
