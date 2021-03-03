import React from 'react';

import Logo from '../../Logo/Logo';
import Menu from '../Menu/Menu';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Menu toggle={props.toggle} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
}

export default Toolbar;