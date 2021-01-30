import React from 'react';
import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];
    for (let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            quantity: props.ingredients[igName]
        })
    }

    const output = (
        ingredients.map((ig) => {
            return <span key={ig.name}>{ig.name} ({ig.quantity})</span>
        })
    )

    return (
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>Rs. {props.price}</strong></p>
        </div>
    );
}

export default Order;