import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }

    orderHandler = (event) => {

        //event.preventDefault();
        //console.log(this.props.ingredients, this.props.price);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Disha Gupta',
                address: {
                    street: 'TestStreet 1',
                    zipcode: '324011',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({ loading: false })
                if (response) this.props.history.push('/')
            })
            .catch((err) => {
                this.setState({ loading: false })
            })

    }

    render() {

        let form = (

            <form>
                <input type="text" name="name" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="Street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>

        )

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

export default WithErrorHandler(ContactData, axios);