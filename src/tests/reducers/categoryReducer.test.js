import categoryReducer from '../../reducers/categoryReducer';
import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_FAILURE,
    FETCH_CATEGORY_SUCCESS
} from '../../actions/categoryActions';

describe('categoryReducer', () => {
    it('should return the initial state', () => {
        expect(categoryReducer(undefined, {})).toEqual({
            loading: false,
            category: {},
            error: ''
        });
    });

    it('should handle FETCH_CATEGORY_REQUEST', () => {
        const action = { type: FETCH_CATEGORY_REQUEST };
        expect(categoryReducer(undefined, action)).toEqual({
            loading: true,
            category: {},
            error: ''
        });
    });


    it('should handle FETCH_CATEGORY_SUCCESS', () => {
        const initialState = {
            loading: false,
            category: {},
            error: '',
        };
        const category =
            { id: 1, name: 'Category 1' }

        ;
        const action = { type: FETCH_CATEGORY_SUCCESS, payload: category };

        expect(categoryReducer(undefined, action)).toEqual({
            ...initialState,
            loading: false,
            category,
        });
    });

    it('should handle FETCH_CATEGORY_FAILURE', () => {
        const error = 'Failed to fetch category';
        const action = { type: FETCH_CATEGORY_FAILURE, payload: error };
        expect(categoryReducer(undefined, action)).toEqual({
            loading: false,
            category: [],
            error
        });
    });
});


