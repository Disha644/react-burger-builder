import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.css';

const naviagtionItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default naviagtionItem;