import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {

        this.props.onFetchOrders();
        //console.log('mounting');
    }

    render() {
        //console.log('render', this.props.loading, this.props.orders);
        return (
            <div>
                {this.props.loading ? <Spinner /> : (this.props.orders.length > 0 ?
                    this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    )) : <p style={{ textAlign: 'center' }}>No orders placed yet!!</p>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        mounted: state.order.mounted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));