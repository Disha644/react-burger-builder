import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.remove.bind(this, props.type)}>Less</button>
            <button className={classes.More} onClick={props.add.bind(this, props.type)}>More</button>
        </div>
    );
}

export default buildControl;