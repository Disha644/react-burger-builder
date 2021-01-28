import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchasing: false,
        loading: false,
        error: null
    }

    /*componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }*/

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

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;

        /*if (this.state.loading) {
            orderSummary = <Spinner />
        }*/

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {

            burger = (
                <Fragment>
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

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                />
            );

            if (this.state.loading) {
                orderSummary = <Spinner />
            }

        }

        return (
            <Fragment>

                <Modal show={this.state.purchasing} disappear={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Fragment>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);