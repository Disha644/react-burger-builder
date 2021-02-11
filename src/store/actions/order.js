import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: order
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const startBurgerPurchase = (order) => {
    return dispatch => {

        axios.post('/orders.json', order)
            .then((response) => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data, order));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            })
    }
}











