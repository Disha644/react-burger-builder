import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth } from '../../store/actions/index';
import classes from './Auth.css'

class Auth extends Component {
    state = {
        controls: {

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity = (value, rules) => {

        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required)
            isValid = isValid && value.trim() !== '';
        if (rules.minLen)
            isValid = isValid && value.length >= rules.minLen;
        if (rules.maxLen)
            isValid = isValid && value.length <= rules.maxLen;
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;

    }

    inputChangedHandler = (event, control) => {

        const updatedControls = {
            ...this.state.controls,
            [control]: {
                ...this.state.controls[control],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[control].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {

        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                setup: this.state.controls[key]
            });
        }

        let form = (

            <form onSubmit={(event) => this.submitForm(event)}>
                {formElements.map((element) =>
                    <Input
                        key={element.id}
                        elementType={element.setup.elementType}
                        elementConfig={element.setup.elementConfig}
                        value={element.setup.value}
                        invalid={!element.setup.valid}
                        shouldValidate={element.setup.validation}
                        touched={element.setup.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                    />
                )}
                <Button btnType="Success">SUBMIT</Button>
            </form>

        );

        return (
            <div className={classes.Auth}>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);






