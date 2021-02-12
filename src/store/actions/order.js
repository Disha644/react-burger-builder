import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

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

export const purchaseBurger = (order) => {
    return dispatch => {

        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', order)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, order));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            })
    }
}











