import React, { Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    /*shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== props.show || nextProps.children !== this.props.children;
    }*/

    return (

        <Fragment>
            <Backdrop show={props.show} disappear={props.disappear} />
            <div className={classes.Modal} style={{
                opacity: props.show ? 1 : 0,
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
                {props.children}
            </div>
        </Fragment>
    );

}

/* If we want React.memo to check only for certain props because we know other props will never change 
then we can pass the function as we have done below. It takes prevProps and nextProps and return true or false if they are equal or not. Actually we write just opposite of what we write in shouldComponentUpdate */
export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
