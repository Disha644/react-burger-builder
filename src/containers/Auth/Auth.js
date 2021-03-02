import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
                    placeholder: 'Password',
                    autoComplete: 'on'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
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

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,
            this.state.isSignup);
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

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p><strong>{this.props.error.message}</strong></p>
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);






