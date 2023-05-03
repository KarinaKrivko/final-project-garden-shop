
import axios from 'axios';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    };
};

export const fetchProductSuccess = products => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: products
    };
};

export const fetchProductFailure = error => {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: error
    };
};

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        axios.get('http://localhost:3333/products/all')
            .then(response => {
                const products = response.data;
                dispatch(fetchProductSuccess(products));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchProductFailure(errorMessage));
            });
    };
};
