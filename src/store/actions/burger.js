import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        name: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        name: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const loadingIngredientsFailed = () => {
    return {
        type: actionTypes.LOADING_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(loadingIngredientsFailed())
            });
    }
}