import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null
    }

    /*componentDidMount() {

        axios.get('/ingredients.json')
            .then(response => {
                //console.log(response.data)
                const updatedIngredients = {
                    salad: response.data.salad,
                    bacon: response.data.bacon,
                    cheese: response.data.cheese,
                    meat: response.data.meat,
                    aaloo: response.data.aaloo
                }
                this.setState({ ingredients: updatedIngredients });
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
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ings) {

            burger = (
                <Fragment>
                    <div style={{ marginBottom: '8px' }}>
                        <Burger ingredients={this.props.ings} />
                    </div>

                    <BuildControls
                        add={this.props.onAddIngredient}
                        remove={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                />
            );

            /*if (this.state.loading) {
                orderSummary = <Spinner />
            }*/
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, name: ingName }),
        onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, name: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));