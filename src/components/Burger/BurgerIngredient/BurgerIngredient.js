import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {

    let ingredient = null;

    switch (props.type) {
        case ('bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seed1}></div>
                    <div className={classes.Seed2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('aaloo'):
            ingredient = <div className={classes.AalooTikki}></div>;
            break;
        default:
            ingredient = null;
    }

    return ingredient;

}

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient;