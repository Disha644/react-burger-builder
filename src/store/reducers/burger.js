import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 5,
    bacon: 7,
    cheese: 9,
    meat: 10,
    aaloo: 10
}

const addIngredient = (state, action) => {

    const updatedIngs = updateObject(state.ingredients, { [action.name]: state.ingredients[action.name] + 1 });
    return updateObject(state, {
        ingredients: updatedIngs, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name], building: true
    });

}

const removeIngredient = (state, action) => {
    const Ings = updateObject(state.ingredients, { [action.name]: state.ingredients[action.name] - 1 });
    return updateObject(state, { ingredients: Ings, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name], building: true });
}

const setIngredients = (state, action) => {
    const ings = action.ingredients;
    const updatedIngredients = {
        salad: ings.salad,
        bacon: ings.bacon,
        cheese: ings.cheese,
        meat: ings.meat,
        aaloo: ings.aaloo
    }
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: 20, error: false, building: false });
}



const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.LOADING_INGREDIENTS_FAILED: return updateObject(state, { error: true });
        default: return state;
    }
};

export default reducer;