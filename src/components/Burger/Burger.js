import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngreidents = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />
            })
        })
        .reduce((arr, curr) => {
            return arr.concat(curr);
        }, []);

    console.log(transformedIngreidents)

    if (transformedIngreidents.length === 0) {
        transformedIngreidents = <p>Please start adding the ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='top' />
            {transformedIngreidents}
            <BurgerIngredient type='bottom' />
        </div>
    );
}

export default burger;