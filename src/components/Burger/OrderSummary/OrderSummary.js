import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price} Rs.</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
        </Fragment>
    );
}

export default orderSummary;