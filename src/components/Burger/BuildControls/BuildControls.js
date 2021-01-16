import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Aaloo Tikki', type: 'aaloo' }
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            {controls.map(control =>
                <BuildControl
                    key={control.type} label={control.label} add={props.add}
                    remove={props.remove} type={control.type}
                />
            )}
        </div>
    );
}

export default buildControls;