import axios from 'axios';
import {API_URL} from "../constants";

export const POST_SALE_REQUEST = "POST_SALE_REQUEST"
export const POST_SALE_SUCCESS = "POST_SALE_SUCCESS"
export const POST_SALE_FAILURE = "POST_SALE_FAILURE"


export const postSaleRequest = (order) => {
    return {
        type: POST_SALE_REQUEST
    };
};

export const postSaleSuccess = (order) => {
    return {
        type: POST_SALE_SUCCESS,
        payload: order
    };
};

export const postSaleFailure = (error) => {
    return {
        type: POST_SALE_FAILURE,
        payload: error
    };
};

export const postSale = (body) => {
    return async (dispatch) => {
        dispatch(postSaleRequest(body));
        try {
            const response = await axios.post(`${API_URL}/sale/send`, body);
            const result = response.data;
            dispatch(postSaleSuccess(result));
            return result;
        } catch (error) {
            const errorMessage = error.message;
            dispatch(postSaleFailure(errorMessage));
            throw error;
        }
    };
};
