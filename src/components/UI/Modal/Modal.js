import React, { Component, Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (

            <Fragment>
                <Backdrop show={this.props.show} disappear={this.props.disappear} />
                <div className={classes.Modal} style={{
                    opacity: this.props.show ? 1 : 0,
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
                }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}
export default Modal;