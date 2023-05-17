import axios from 'axios';
import { API_URL } from '../constants';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST
    };
};

export const fetchCategoriesSuccess = categories => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories
    };
};

export const fetchCategoriesFailure = error => {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        payload: error
    };
};

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesRequest());
        axios.get(`${API_URL}/categories/all`)
            .then(response => {
                const categories = response.data;
                dispatch(fetchCategoriesSuccess(categories));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchCategoriesFailure(errorMessage));
            });
    };
};
