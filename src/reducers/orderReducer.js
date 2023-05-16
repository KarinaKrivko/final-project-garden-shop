import {POST_ORDER_FAILURE, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../actions/orderAction";

const initialState = {
    order: {},
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            };
        case POST_ORDER_FAILURE:
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