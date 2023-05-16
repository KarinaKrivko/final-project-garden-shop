import {POST_SALE_FAILURE, POST_SALE_REQUEST, POST_SALE_SUCCESS} from "../actions/saleAction";

const initialState = {
    order: {},
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_SALE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case POST_SALE_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            };
        case POST_SALE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;