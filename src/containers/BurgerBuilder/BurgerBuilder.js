import React, { Component, Fragment } from 'react';
import BurgerIngredient from '../../components/BurgerIngredient/BurgerIngredient'

class BurgerBuilder extends Component {
    render() {
        return (
            <Fragment>
                <BurgerIngredient />
                <div>Build Controls</div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;