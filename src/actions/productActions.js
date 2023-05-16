import axios from 'axios';
import {API_URL} from "../constants";

export const FETCH_PRODUCT_REQUEST  = "FETCH_PRODUCT_REQUEST"
export const FETCH_PRODUCT_SUCCESS  = "FETCH_PRODUCT_SUCCESS"
export const FETCH_PRODUCT_FAILURE  = "FETCH_PRODUCT_FAILURE"



export const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    };
};

export const fetchProductSuccess = (product) => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: product
    };
};

export const fetchProductFailure = (error) => {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: error
    };
};

export const fetchProduct = (productId) => {
    return (dispatch) => {
        dispatch(fetchProductRequest());
        axios
            .get(`${API_URL}/products/${productId}`)
            .then((response) => {
                const product = response.data;
                dispatch(fetchProductSuccess(product));
            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch(fetchProductFailure(errorMessage));
            });
    };
};
