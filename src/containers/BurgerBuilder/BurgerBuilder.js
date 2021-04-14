import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { initIngredients, addIngredient, removeIngredient, purchaseInit, authSetRedirectPath } from '../../store/actions/index';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onPurchaseInit();
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key];
        }
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/authetication')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    }



    const disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    let orderSummary = null;

    let burger = props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> : <Spinner />
    if (props.ings) {

        burger = (
            <Fragment>
                <div style={{ marginBottom: '8px' }}>
                    <Burger ingredients={props.ings} />
                </div>

                <BuildControls
                    add={props.onAddIngredient}
                    remove={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                />
            </Fragment>
        );

        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                price={props.price}
                cancel={purchaseCancelHandler}
                continue={purchaseContinueHandler}
            />
        );
    }

    return (
        <Fragment>

            <Modal show={purchasing} disappear={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}

        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(initIngredients()),
        onAddIngredient: (ingName) => dispatch(addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        onPurchaseInit: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(authSetRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));