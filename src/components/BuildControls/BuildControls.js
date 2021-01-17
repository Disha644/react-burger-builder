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

            <p style={{ marginBottom: '5px' }}>Price: <strong>{props.price} Rs. </strong></p>
            {controls.map(control =>
                <BuildControl
                    key={control.type}
                    label={control.label}
                    add={props.add}
                    remove={props.remove}
                    type={control.type}
                    disabled={props.disabled[control.type]}
                />
            )}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>

        </div>
    );
}

export default buildControls;