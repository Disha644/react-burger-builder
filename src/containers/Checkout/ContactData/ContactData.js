import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-orders';
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        orderForm: {

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
                    required: true
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
            },

        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props.price);
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
        return isValid;

    }

    valueChangedHandler = (event, key) => {

        const updatedForm = { ...this.state.orderForm };
        /*
        This is being done because {...this.state.orderForm} perform shallow cloning the json object of orderForm will be cloned but that of name, email... or that of element config won't be cloned. updatedForm[key] will still point to orderForm[key] so we are cloning that too so orignal one gets updated using set state only
        */
        const updatedElement = { ...updatedForm[key] };
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[key] = updatedElement;

        let formIsValid = true;
        for (let key in updatedForm) {
            //console.log(key + " " + updatedForm[key].valid)
            formIsValid = formIsValid && updatedForm[key].valid
        }

        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });

    }

    orderHandler = (event) => {

        //event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customerDetails: formData
        }



    }

    render() {

        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                setup: this.state.orderForm[key]
            });
        }

        let form = (

            <form onSubmit={this.orderHandler}>
                {formElements.map((element) =>
                    <Input
                        key={element.id}
                        elementType={element.setup.elementType}
                        elementConfig={element.setup.elementConfig}
                        value={element.setup.value}
                        invalid={!element.setup.valid}
                        shouldValidate={element.setup.validation}
                        touched={element.setup.touched}
                        changed={(event) => this.valueChangedHandler(event, element.id)}
                    />
                )}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>

        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Please enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice
    }
}

export default connect(mapStateToProps)(WithErrorHandler(ContactData, axios));