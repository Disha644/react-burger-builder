import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: authData
    }
}

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8wkTvyYDFU9amzyIe2dLOjO9dG716190', data)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err));
            })
    }
}