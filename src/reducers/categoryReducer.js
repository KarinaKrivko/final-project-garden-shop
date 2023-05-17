import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_FAILURE,
    FETCH_CATEGORY_SUCCESS
} from '../actions/categoryActions';

const initialState = {
    loading: false,
    category: {},
    error: ''
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_CATEGORY_SUCCESS:
            const result = {
                loading: false,
                category: action.payload,
                error: ''
            };
            return result;
        case FETCH_CATEGORY_FAILURE:
            return {
                loading: false,
                category: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;
