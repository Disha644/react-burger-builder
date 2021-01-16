import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 5,
    bacon: 7,
    cheese: 10,
    meat: 10,
    aaloo: 10
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            aaloo: 0
        },
        totalPrice: 20
    }

    addIngredientHandler = (type) => {

        const count = this.state.ingredients[type];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = count + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

    }

    removeIngredientHandler = (type) => {

        const count = this.state.ingredients[type];
        if (count > 0) {
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = count - 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
        }

    }

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <div style={{ margin: '20px' }}>
                    <BuildControls add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler} />
                </div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;