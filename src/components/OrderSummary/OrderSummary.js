import React, { Fragment } from 'react';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((item) => {
        return (
            <li key={item}>
                <span style={{ textTransform: 'capitalize' }}>{item}</span>: {props.ingredients[item]}
            </li>
        );
    });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Fragment>
    );
}

export default orderSummary;