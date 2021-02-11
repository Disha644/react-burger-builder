import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 5,
    bacon: 7,
    cheese: 9,
    meat: 10,
    aaloo: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                //because no deep cloning
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
            }

        case actionTypes.SET_INGREDIENTS:

            const ings = action.ingredients;
            const updatedIngs = {
                salad: ings.salad,
                bacon: ings.bacon,
                cheese: ings.cheese,
                meat: ings.meat,
                aaloo: ings.aaloo
            }

            return {
                ...state,
                ingredients: updatedIngs,
                totalPrice: 20,
                error: false
            }

        case actionTypes.LOADING_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
};

export default reducer;