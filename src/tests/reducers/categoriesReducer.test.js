import categoriesReducer from '../../reducers/categoriesReducer';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
} from '../../actions/categoriesActions';

describe('categoriesReducer', () => {
    it('should return the initial state', () => {
        expect(categoriesReducer(undefined, {})).toEqual({
            loading: false,
            categories: [],
            error: '',
        });
    });

    it('should handle FETCH_CATEGORIES_REQUEST', () => {
        expect(
            categoriesReducer(undefined, { type: FETCH_CATEGORIES_REQUEST })
        ).toEqual({
            loading: true,
            categories: [],
            error: '',
        });
    });

    it('should handle FETCH_CATEGORIES_SUCCESS', () => {
        const categories = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
        ];

        expect(
            categoriesReducer(undefined, {
                type: FETCH_CATEGORIES_SUCCESS,
                payload: categories,
            })
        ).toEqual({
            loading: false,
            categories,
            error: '',
        });
    });

    it('should handle FETCH_CATEGORIES_FAILURE', () => {
        const error = 'Failed to fetch categories';

        expect(
            categoriesReducer(undefined, {
                type: FETCH_CATEGORIES_FAILURE,
                payload: error,
            })
        ).toEqual({
            loading: false,
            categories: [],
            error,
        });
    });
});
