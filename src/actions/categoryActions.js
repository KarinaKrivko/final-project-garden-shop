
import axios from 'axios';
import {API_URL} from "../constants";

export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const fetchCategoryRequest = () => {
    return {
        type: FETCH_CATEGORY_REQUEST
    };
};

export const fetchCategorySuccess = category => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        payload: category
    };
};

export const fetchCategoryFailure = error => {
    return {
        type: FETCH_CATEGORY_FAILURE,
        payload: error
    };
};

export const fetchCategory = (id) => {
    return dispatch => {
        dispatch(fetchCategoryRequest());
        axios.get(`${API_URL}/categories/${id}`)
            .then(response => {
                const category = response.data;
                dispatch(fetchCategorySuccess(category));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchCategoryFailure(errorMessage));
            });
    };
};
