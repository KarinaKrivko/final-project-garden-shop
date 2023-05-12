
import axios from 'axios';
import {API_URL} from "../constants";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};

export const fetchProductsSuccess = products => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    };
};

export const fetchProductsFailure = error => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    };
};

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsRequest());
        axios.get(`${API_URL}/products/all`)
            .then(response => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchProductsFailure(errorMessage));
            });
    };
};
