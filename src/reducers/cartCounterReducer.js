
const initialState = {
    counter: 0
};

const cartCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CART_COUNTER':
            return {
                ...state,
                counter: action.payload
            };
        default:
            return state;
    }
};

export default cartCounterReducer;