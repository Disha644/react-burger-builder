import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

const Layout = (props) => {

    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const toggleSideDrawerHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    }

    const closeSideDrawerHandler = () => {
        setSideDrawerOpen(false);
    }

    return (
        <Fragment>

            <Toolbar
                isAuth={props.isAutheticated}
                toggle={toggleSideDrawerHandler}
            />
            <SideDrawer
                isAuth={props.isAutheticated}
                sideDrawerOpen={sideDrawerOpen}
                close={closeSideDrawerHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>

        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        isAutheticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);