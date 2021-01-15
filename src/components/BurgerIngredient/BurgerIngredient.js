import React, { Fragment } from 'react';
import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {
    let ingredient = null;
    return (
        <Fragment>
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
                hello
            </div>
            <div className={classes.Bacon}>hello world</div>
            <div className={classes.Cheese}>hello world</div>
            <div className={classes.Salad}>hello world</div>
            <div className={classes.Meat}>hello world</div>
            <div className={classes.BreadBottom}>hello world</div>
        </Fragment>
    );

};

export default burgerIngredient;