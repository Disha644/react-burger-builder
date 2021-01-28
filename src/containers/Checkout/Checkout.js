import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {

        //console.log(this.props);
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let [key, value] of queryParams.entries()) {
            if (key === 'price') {
                this.state.totalPrice = value
            } else {
                ingredients[key] = +value
            }
        }
        this.setState({ ingredients: ingredients });

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />

                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (<ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} {...this.props}
                    />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;