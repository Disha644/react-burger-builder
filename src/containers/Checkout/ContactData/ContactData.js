import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import axios from '../../../axios-orders';
import classes from './ContactData.css'
import { updateObject, checkValidity } from '../../../shared/utility';


const ContactData = props => {

    const [orderForm, setOrderForm] = useState({

        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
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
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'ZIP CODE'
            },
            value: '',
            validation: {
                required: true,
                minLen: 6,
                maxLen: 6
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const valueChangedHandler = (event, key) => {

        const updatedElement = updateObject(orderForm[key], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[key].validation),
            touched: true
        });

        const updatedForm = updateObject(orderForm, {
            [key]: updatedElement
        });

        let formIsValid = true;
        for (let key in updatedForm) {
            //console.log(key + " " + updatedForm[key].valid)
            formIsValid = formIsValid && updatedForm[key].valid
        }

        setOrderForm(updatedForm);
        setFormIsValid(formIsValid);

    }

    const orderHandler = (event) => {

        //event.preventDefault();
        const formData = {};
        for (let key in orderForm) {
            formData[key] = orderForm[key].value
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            customerDetails: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            setup: orderForm[key]
        });
    }

    let form = (

        <form onSubmit={orderHandler}>
            {formElements.map((element) =>
                <Input
                    key={element.id}
                    elementType={element.setup.elementType}
                    elementConfig={element.setup.elementConfig}
                    value={element.setup.value}
                    invalid={!element.setup.valid}
                    shouldValidate={element.setup.validation}
                    touched={element.setup.touched}
                    changed={(event) => valueChangedHandler(event, element.id)}
                />
            )}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>

    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Please enter your Contact Data</h4>
            {form}
        </div>
    );

}


const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order, token) => dispatch(purchaseBurger(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));