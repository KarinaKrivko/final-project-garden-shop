import axios from 'axios';
import {API_URL} from "../constants";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST"
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS"
export const POST_ORDER_FAILURE = "POST_ORDER_FAILURE"


export const postOrderRequest = (order) => {
    return {
        type: POST_ORDER_REQUEST
    };
};

export const postOrderSuccess = (order) => {
    return {
        type: POST_ORDER_SUCCESS,
        payload: order
    };
};

export const postOrderFailure = (error) => {
    return {
        type: POST_ORDER_FAILURE,
        payload: error
    };
};

export const postOrder = (body) => {
    return async (dispatch) => {
        dispatch(postOrderRequest(body));
        try {
            const response = await axios.post(`${API_URL}/order/send`, body);
            const result = response.data;
            dispatch(postOrderSuccess(result));
            return result;
        } catch (error) {
            const errorMessage = error.message;
            dispatch(postOrderFailure(errorMessage));
            throw error;
        }
    };
};
