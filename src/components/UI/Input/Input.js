import React from 'react';
import classes from './Input.css'

const Input = (props) => {

    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    let inputElement = null;
    switch (props.elementType) {

        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
                onChange={props.changed} />
            break;

        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig}
                value={props.value} onChange={props.changed} />
            break;

        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(op =>
                        <option value={op.value} key={op.value}>{op.displayValue}</option>
                    )}
                </select>
            );
            break;

        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
                onChange={props.changed} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    )

}
export default Input;