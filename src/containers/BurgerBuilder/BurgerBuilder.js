import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 5,
    bacon: 7,
    cheese: 9,
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
        totalPrice: 20,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key];
        }
        this.setState({
            purchasable: sum > 0
        });
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
        this.updatePurchaseState(updatedIngredients);

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
            this.updatePurchaseState(updatedIngredients);
        }

    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <div style={{ marginBottom: '8px' }}>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <BuildControls
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />

            </Fragment>
        );
    }
}

export default BurgerBuilder;