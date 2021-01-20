import React, { Component, Fragment } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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

                <Toolbar toggle={this.toggleSideDrawerHandler} />
                <SideDrawer
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

export default Layout;