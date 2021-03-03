import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {

    state = {
        sideDrawerOpen: false
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    closeSideDrawerHandler = () => {
        this.setState({ sideDrawerOpen: false });
    }


    render() {
        return (
            <Fragment>

                <Toolbar
                    isAuth={this.props.isAutheticated}
                    toggle={this.toggleSideDrawerHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAutheticated}
                    sideDrawerOpen={this.state.sideDrawerOpen}
                    close={this.closeSideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAutheticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);