import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css';

const naviagtionItems = (props) => (
    <ul className={classes.NavigationItems}>

        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuth ?
            <NavigationItem link="/authetication">Authenticate</NavigationItem> :
            <NavigationItem link="/logout">Logout</NavigationItem>
        }

    </ul>
);

export default naviagtionItems;