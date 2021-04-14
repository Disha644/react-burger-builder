import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth, authSetRedirectPath } from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Auth.css'

const Auth = (props) => {

    const [controls, setControls] = useState({
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

    });

    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, []);

    const inputChangedHandler = (event, control) => {

        const updatedControl = updateObject(controls[control], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[control].validation),
            touched: true
        });


        const updatedControls = updateObject(controls, {
            [control]: updatedControl
        });

        setControls(updatedControls);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const submitForm = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }


    const formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            setup: controls[key]
        });
    }

    let form = (
        <form onSubmit={(event) => submitForm(event)}>
            {formElements.map((element) =>
                <Input
                    key={element.id}
                    elementType={element.setup.elementType}
                    elementConfig={element.setup.elementConfig}
                    value={element.setup.value}
                    invalid={!element.setup.valid}
                    shouldValidate={element.setup.validation}
                    touched={element.setup.touched}
                    changed={(event) => inputChangedHandler(event, element.id)}
                />
            )}
            <Button btnType="Success">SUBMIT</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p><strong>{props.error.message}</strong></p>
    }

    let redirectUser = null
    if (props.isAuthenticated) {
        redirectUser = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {redirectUser}
            {errorMessage}
            {form}
            <Button btnType="Danger" clicked={switchAuthModeHandler}>
                {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burger.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authSetRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);






