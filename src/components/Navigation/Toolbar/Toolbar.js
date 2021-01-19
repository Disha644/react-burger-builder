import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>menu</div>
            <Logo />
            <NavigationItems />
        </header>
    );
}

export default toolbar;