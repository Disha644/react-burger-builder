import React from 'react';
import classes from './Menu.css';

const menu = (props) => (
    <div onClick={props.toggle} className={classes.Menu}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menu;