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

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: err
    }
}

export const fetchOrders = () => {
    return dispatch => {

        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                //console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFailed(err));
            });
    }
}























