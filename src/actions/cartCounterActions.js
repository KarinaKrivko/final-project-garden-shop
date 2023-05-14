import _ from "lodash";

export const updateCartCounter = (counter) => {
    return {
        type: 'UPDATE_CART_COUNTER',
        payload: counter
    };
};

export const calculateCounter = () => {
    return dispatch => {
        const productCounts = Object.keys(localStorage)
            .filter(key =>
                key.startsWith('product_'))
            .map(
                key => localStorage.getItem(key)
            )
            .map(it => JSON.parse(it))
            .map(it =>
                it.count
            )
        const result = _.sum(productCounts);
        dispatch(updateCartCounter(result))
    }
}
